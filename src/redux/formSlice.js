
import { createSlice } from '@reduxjs/toolkit'



// slice - по сути это глобальная функция над привычным редусером - которая включает в себя, и изначальный стейт, и редусеры и даже сама создает action-creator
const formSlice = createSlice({
    name: 'form',

    initialState: {
        step1: [],
        step2: [],
        step3: [],
        step4: [],
        step5: [],
    },

    // Наши действия, которые мы можем сделать на странице (В обычном редаксе мы их описывали внутри редусера)
    reducers: {
        addStep1(state, action) {
            state.step1 = action.payload
        },
        addStep2(state, action) {
            state.step2 = action.payload
        },
        addStep3(state, action) {
            state.step3 = action.payload
        },
        addStep4(state, action) {
            state.step4 = action.payload
        },
        addStep5(state, action) {
            state.step5 = action.payload
        },
    },
    
})



// addText - addText - автоматически созданный action creator, который мы и будем диспачить. Теперь их не нужно создавать, а также не нужно создавать константы и описывать поведение редусера
export const { addStep1, addStep2, addStep3, addStep4, addStep5} = formSlice.actions


export default formSlice.reducer