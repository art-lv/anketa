/* Redux Toolkit предоставляет инструменты для настройки хранилища и выполнения наиболее распространенных операций, а также содержит полезные утилиты, позволяющие упростить кодRedux Toolkit предоставляет инструменты для настройки хранилища и выполнения наиболее распространенных операций, а также содержит полезные утилиты, позволяющие упростить код */
import { configureStore } from '@reduxjs/toolkit'
import formReducer from './formSlice'

let store = configureStore({
    reducer: {
        forms: formReducer,
    }
})

export default store
window.store = store