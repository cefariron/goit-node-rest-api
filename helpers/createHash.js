import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const passwordHashCreate = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

export const emailHashCreate = async (email) => {
    const emailHash = crypto.createHash('md5').update(email).digest('hex');
    return emailHash;
}