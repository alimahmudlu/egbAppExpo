const CreateTaskValidation = {
    project: {
        presence: true
    },
    assigned_employee: {
        presence: true
    },
    title: {
        presence: true,
        length: { minimum: 2 }
    },
    description: {
        presence: true,
        length: { minimum: 2 }
    },
    point: {
        presence: true,
    },
    deadline: {
        presence: true,
    },
}
const AddDocsValidation = {
    document: {
        presence: true
    },
    file: {
        presence: true
    },
    date_of_issue: {
        custom: function (date_of_issue, row) {
            if (!row.document ||  row?.fileTypes.find(el => el?.key === row?.document)?.dateRequired && !date_of_issue) {
                return { errors: { date_of_issue: 'blank' } }
            } else {
                return null;
            }
        }
    },
    date_of_expiry: {
        custom: function (date_of_expiry, row) {
            if (!row.document ||  row?.fileTypes.find(el => el?.key === row?.document)?.dateRequired && !date_of_expiry) {
                return { errors: { date_of_expiry: 'blank' } }
            } else {
                return null;
            }
        }
    }
}


export const validationConstraints = (data, key) => {
    switch (key) {
        case 'chiefCreateTask':
            return CreateTaskValidation;
            break;

        case 'addDocs':
            return AddDocsValidation;
            break;

        default:
            return null
    }
}

export default validationConstraints;