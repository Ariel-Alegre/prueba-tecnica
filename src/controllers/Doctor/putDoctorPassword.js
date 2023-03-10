const { doctor } = require('../../database/models');
const { encrypt } = require("../../helpers/handleBcrypt")

module.exports = {
    DoctorPassword: async (req, res, next) => {
        const { doctorId } = req.params
        const { password } = req.body

        try {
            const onePatient = await doctor.findByPk(doctorId)

            if (!onePatient) {
                res.status(404).json({ message: "User not found" })
            } else {
                const passwordHash = await encrypt(password)
                const userUpdate = await onePatient.update({
                    password: passwordHash
                })

                if (userUpdate) {
                    res.status(200).json(userUpdate)
                }
            }
        } catch (error) {
            res.send(`[Error Update patients] - [patients - PUT]: ${error}`)
        }
    }
};