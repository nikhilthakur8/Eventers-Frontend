export const validateFileSize = (fileList) => {
    const maxSize = 10 * 1024 * 1024;
    if (fileList[0] && fileList[0].size > maxSize) {
        return "File size should not exceed 10MB";
    } else {
        return true;
    }
};
