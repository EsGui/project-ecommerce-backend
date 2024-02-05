const validateDataProduct = {
    validateString: (array) => {
        const validate = array.some((element) => (typeof element) != "string");
        return validate
    },

    validateNumber: (array) => {
        const validate = array.some((element) => (typeof element) != "number");
        return validate
    }
}

module.exports = validateDataProduct;