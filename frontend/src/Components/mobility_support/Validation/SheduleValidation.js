// SheduleValidation.js

export const validateElderId = (elderId) => {
        if (!elderId) {
            return 'Elder ID is required.';
        }
        return /^EID\d{3}$/.test(elderId) ? null : 'Elder ID must start with "EID" followed by exactly 3 numbers.';
};    

export const validatePhoneNumber = (number) => {
    return /^\d{10}$/.test(number) ? null : 'Phone number must be exactly 10 digits.';
};

export const validateNIC = (nic) => {
    return /^(\d{11}V|\d{12})$/.test(nic) ? null : 'NIC must be 11 digits followed by "V" or 12 digits.';
};
  
export const validateDate = (date) => {
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate > today ? null : 'Date must valid.';
};

export const validateTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const inputTime = hours * 60 + minutes; // Convert time to minutes for easy comparison

    const startTime = 8 * 60;  // 08:00 in minutes
    const endTime = 20 * 60;   // 20:00 in minutes

    return inputTime >= startTime && inputTime <= endTime
        ? null
        : 'Time must be between 08:00 and 20:00.';
};

