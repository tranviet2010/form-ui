export const DateToDay = (birthDate) => {
    // Chuyển đổi chuỗi ngày tháng năm sinh thành đối tượng Date
    const birth = new Date(birthDate);

    // Lấy ngày hiện tại
    const today = new Date();

    // Tính số ngày giữa ngày sinh và ngày hiện tại
    const diffTime = Math.abs(today - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}


export const DayToDate = (days) => {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    return { years, months };
}

export const AgeToDate = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    const ageDays = today.getDate() - birth.getDate();

    // Điều chỉnh nếu tháng sinh lớn hơn tháng hiện tại
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }

    // Điều chỉnh nếu ngày sinh lớn hơn ngày hiện tại
    if (ageDays < 0) {
        ageMonths--;
        if (ageMonths < 0) {
            ageMonths += 12;
            ageYears--;
        }
    }

    return `${ageYears} năm và ${ageMonths} tháng`
}

export const getInfoHeight = (obj, check) => {

    if (typeof obj !== 'object' || obj === null) {
        return 'Đối tượng không hợp lệ';
    }
    const keys = Object.keys(obj);

    // Duyệt qua từng khóa và kiểm tra xem khóa có trùng với các case không
    for (let key of keys) {
        switch (key) {
            case 'up_height1':
                return `Chiều cao hiện tại trên chuẩn độ 1 là ${(check - obj?.up_height1).toFixed(1)} (cm)`;
            case 'up_height2':
                return `Chiều cao hiện tại trên chuẩn độ 2 là ${(check - obj?.up_height2).toFixed(1)} (cm)`;
            case 'up_height3':
                return `Chiều cao hiện tại trên chuẩn độ 3 là ${(check - obj?.up_height3).toFixed(1)} (cm)`;
            case 'dow_height1':
                return `Chiều cao hiện tại dưới chuẩn độ 1 là ${(obj?.dow_height1 - check).toFixed(1)} (cm)`;
            case 'dow_height2':
                return `Chiều cao hiện tại dưới chuẩn độ 2 là ${(obj?.dow_height2 - check).toFixed(1)} (cm)`;
            case 'dow_height3':
                return `Chiều cao hiện tại dưới chuẩn độ 3 là ${(obj?.dow_height3 - check).toFixed(1)} (cm)`;
            case 'height':
                return `Chiều cao hiện tại đúng độ chuẩn`;

            case 'up_weight1':
                return `Cân nặng hiện tại trên chuẩn độ 1 là ${(check - obj?.up_weight1).toFixed(1)} (kg)`;
            case 'up_weight2':
                return `Cân nặng hiện tại trên chuẩn độ 2 là ${(check - obj?.up_weight2).toFixed(1)} (kg)`;
            case 'up_weight3':
                return `Cân nặng hiện tại trên chuẩn độ 3 là ${(check - obj?.up_weight3).toFixed(1)} (kg)`;
            case 'dow_weight1':
                return `Cân nặng hiện tại dưới chuẩn độ 1 là ${(obj?.dow_weight1 - check).toFixed(1)} (kg)`;
            case 'dow_weight2':
                return `Cân nặng hiện tại dưới chuẩn độ 2 là ${(obj?.dow_weight2 - check).toFixed(1)} (kg)`;
            case 'dow_weight3':
                return `Cân nặng hiện tại dưới chuẩn độ 3 là ${(obj?.dow_weight3 - check).toFixed(1)} (kg)`;
            case 'weight':
                return `Cân nặng hiện tại đúng độ chuẩn`;

            default:
                break;
        }
    }

    // Nếu không có khóa nào khớp, trả về giá trị không hợp lệ
    return 'Không có khóa hợp lệ';
}

export const getSum = (obj, check, obj20) => {
    console.log("obj20",obj20);
    if (typeof obj !== 'object' || obj === null) {
        return 'Đối tượng không hợp lệ';
    }
    const keys = Object.keys(obj);

    // Duyệt qua từng khóa và kiểm tra xem khóa có trùng với các case không
    for (let key of keys) {
        switch (key) {
            case 'up_height1':
                return `${(check - obj?.up_height1 + Number(obj20?.up_height1)).toFixed(1)} (cm)`;
            case 'up_height2':
                return `${(check - obj?.up_height2 + Number(obj20?.up_height2)).toFixed(1)} (cm)`;
            case 'up_height3':
                return `${(check - obj?.up_height3 + Number(obj20?.up_height3)).toFixed(1)} (cm)`;
            case 'dow_height1':
                return `${(check - obj?.dow_height1 + Number(obj20?.dow_height1)).toFixed(1)} (cm)`;
            case 'dow_height2':
                return `${(check - obj?.dow_height2 + Number(obj20?.dow_height2)).toFixed(1)} (cm)`;
            case 'dow_height3':
                return `${(check - obj?.dow_height3 + Number(obj20?.dow_height3)).toFixed(1)} (cm)`;
            case 'height':
                return `${(check - obj?.height + Number(obj20?.height)).toFixed(1)} (cm)`;

            case 'up_weight1':
                return `${(check - obj?.up_weight1 + Number(obj20?.up_weight1)).toFixed(1)} (kg)`;
            case 'up_weight2':
                return `${(check - obj?.up_weight2 + Number(obj20?.up_weight2)).toFixed(1)} (kg)`;
            case 'up_weight3':
                return `${(check - obj?.up_weight3 + Number(obj20?.up_weight3)).toFixed(1)} (kg)`;
            case 'dow_weight1':
                return `${(check - obj?.dow_weight1 + Number(obj20?.dow_weight1)).toFixed(1)} (kg)`;
            case 'dow_weight2':
                return `${(check - obj?.dow_weight2 + Number(obj20?.dow_weight2)).toFixed(1)} (kg)`;
            case 'dow_weight3':
                return `${(check -obj?.dow_weight3 + Number(obj20?.dow_weight3)).toFixed(1)} (kg)`;
            case 'weight':
                return `${(check - obj?.weight + Number(obj20?.weight)).toFixed(1)} (kg)`;

            default:
                break;
        }
    }

    // Nếu không có khóa nào khớp, trả về giá trị không hợp lệ
    return 'Không có khóa hợp lệ';
}

export const GetHeightBasedData  = (inputHeight, obj) => {
    const height = parseFloat(obj.height);
    const inputNum = parseFloat(inputHeight);

    if (isNaN(inputNum)) {
        throw new Error("Invalid inputHeight value. Must be a number.");
    }
    let heights
    let compareFunc
    if (inputNum > height) {
        heights = Object.fromEntries(Object.entries(obj.up_height).map(([k, v]) => [k, parseFloat(v)]));
        compareFunc = (h) => h <= inputNum; // Tìm giá trị nhỏ hơn hoặc bằng inputHeight
    } else {
        heights = Object.fromEntries(Object.entries(obj.dow_height).map(([k, v]) => [k, parseFloat(v)]));
        compareFunc = (h) => h >= inputNum; // Tìm giá trị lớn hơn hoặc bằng inputHeight
    }

    let closestHeightKey
    let smallestDiff = Infinity;

    for (let [key, h] of Object.entries(heights)) {
        if (compareFunc(h)) {
            let diff = Math.abs(h - inputNum);
            if (diff < smallestDiff) {
                smallestDiff = diff;
                closestHeightKey = key;
            }
        }
    }
    if (closestHeightKey !== null) {
        if (inputNum > height) {
            return { [closestHeightKey]: obj.up_height[closestHeightKey] };
        } else {
            return { [closestHeightKey]: obj.dow_height[closestHeightKey] };
        }
    }

    return null;
}


