export const isValidInput = (inputValue: string): boolean => {
    if (isNaN(+inputValue)) {
        alert('Not a number');
        return false;
    }

    if (inputValue.length === 0) {
        return false;
    }

    return true;
};
