// PACKETS
import moment from 'moment';

// HELPERS
import validator from 'validate.js';

/**
 * @functionName GLOBAL VALIDATE
 * @functionDescription Global validate. Hər hansısa şeyi validate edir.
 */
export const globalValidate = (dataForm, constraints) => {
	validator.validate.extend(validator.validators.datetime, {
		// The value is guaranteed not to be null or undefined but otherwise it
		// could be anything.
		parse(value, options) {
			const format = options.format || (options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss");
			return +moment.utc(value, format);
		},
		// Input is a unix timestamp
		format(value, options) {
			const format = options.format || (options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss");
			return moment.utc(value).format(format);
		}
	});


	validator.validate.formatters.custom = function custom(errors) {
		let result = {};
		let toasts = [];
		errors.forEach(e => {
			if (e.error.errors) {
				result = { ...result, ...e.error.errors };
			} else {
				result[e.attribute] = 'blank';
			}
			if ((e.error || {}).toasts) {
				toasts = toasts.concat(e.error.toasts);
			}
		});
		return {
			errors: result,
			toasts
		};
	};

	validator.validate.validators.custom = function custom(_, data) {
		return data;
	};
	return validator.validate(dataForm, constraints, { format: "custom" });
}

/**
 * @functionName GLOBAL VALIDATE WITH ARRAY
 * @functionDescription Array datanı validate edir.
 */
export const globalValidateWithArray = (array, constraints, key) => {
	let toasts = [];
	const errors = {};
	errors[key] = [];
	(array || []).forEach((item, index) => {
		const resultValidate = globalValidate(item, constraints);
		if (resultValidate.toasts) {
			toasts = toasts.concat(resultValidate.toasts);
		}
		if (resultValidate.errors && Object.keys(resultValidate.errors).length > 0) {
			errors[key][index] = resultValidate.errors
		}
	});

	return errors[key].length === 0 ? null : { errors, toasts };
}


export const validate = (data, type, validationConstraints) => {
	const constraints = validationConstraints(data, type);
	const { errors } = globalValidate(data, constraints);

	return errors || {};
}