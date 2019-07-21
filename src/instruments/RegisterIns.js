import request from 'request'

export default class {

    constructor(payload) {
        this.payload = payload
    }

    /**
     * for the sake of simplicity lets just
     * use request asi is, without wrapping it (to make it modular)
     * we can do that later in production
     */
    saveData() {
        const BASE_URL = process.env.VUE_APP_SERVER_BASE_URL
        return new Promise((resolve, reject) => {
            request({
                url: `${BASE_URL}/api/user`,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                form: {
                    email: this.payload.email,
                    no_hp: this.payload.no_hp,
                    first_name: this.payload.first_name,
                    last_name: this.payload.last_name,
                    date_of_birth: this.payload.date_of_birth,
                    gender: this.payload.gender
                }
            }, function (err, _, body) {
                if (err) {
                    reject(err)
                }
                resolve(body)
            })
        })
    }
}