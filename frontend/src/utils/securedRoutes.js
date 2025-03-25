export const secureRoutes = {
    sendOtp: "/otp-4f8fbb6a-28d1-42ea-b1b6-123456789abc",
    verifyOtp: "/verify-6aef1234-48bf-4d28-babc-123456789def",
    login: "/login-8bcf1234-51d7-429f-8912-123456789ghi",
    register: ""
};


//otp - /randomCode/randomUniqueCode
// ?navigate(`/hunter code verification/${randomCode}/${randomUniqueCode}`);
// userForm /randomUniqueCode
// ?navigate(`/greed userform/hunter creation/${randomUniqueCode}`)

export const randomCode = [
    ...Array(Math.floor(Math.random() * (100 - 80 + 1)) + 80),
]
    .map(() =>
        Math.random()
            .toString(36)
            .charAt(Math.floor(Math.random() * 10) + 2)
            .toLowerCase()
    )
    .join("");



export const randomUniqueCode = (() => {
    const length = Math.floor(Math.random() * (100 - 80 + 1)) + 80;
    let code = Array.from({ length }, () =>
        Math.random().toString(36).charAt(Math.floor(Math.random() * 10) + 2)
    ).join("");

    // Determine how many hyphens to insert (3 to 5)
    const hyphenCount = Math.floor(Math.random() * 3) + 3;

    // Generate unique positions for hyphens
    let positions = new Set();
    while (positions.size < hyphenCount) {
        let pos = Math.floor(Math.random() * (code.length - 2)) + 1; // Avoid start/end
        positions.add(pos);
    }

    // Insert hyphens
    code = [...code];
    positions.forEach(pos => code.splice(pos, 0, "-"));

    return code.join("");
})();
