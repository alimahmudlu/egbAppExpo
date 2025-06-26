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


export const validationConstraints = (key, data) => {
    switch (key) {
        case 'chiefCreateTask':
            return CreateTaskValidation;
            break;

        default:
            return null
    }
}

export default validationConstraints;