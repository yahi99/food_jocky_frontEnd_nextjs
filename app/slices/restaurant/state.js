const state = {
    restaurants: {
        loading: true,
        error: false,
        msg: '',
        all: [],
        top: [],
        nearest: [],
        new: []
    },
    restaurant: {
        loading: true,
        error: false,
        msg: '',
        data: {}
    },
    cart: {
    }
}

export default state