import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useNavigate } from 'react-router-dom'
import icon from '../../images/icon-step-5.svg'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addStep5 } from '../../redux/formSlice'


const Step5 = () => {



    








    const navigate = useNavigate()
    const dispatch = useDispatch()
    const forms = useSelector(state => state.forms)



    // Реакт хук форма
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const sendForm = (data) => {
        dispatch(addStep5(data))

        alert('Форма заполнена, посмотреть данные в консоли "store.getState()"')
    }


    let [count, setCount] = useState(2)
    let [allSocialNetwork, setSocialNetwork] = useState([])

    const newSocialNetwork = () => {
        
        setSocialNetwork([...allSocialNetwork, {
            socialNetwork: `socialNetwork${count}`,
            application: `application${count}`,
        }])

        setCount(count + 1)
  
    }







    return (
        <div>




            <div className='page-icon'>
                <img src={icon} alt="" />
            </div>
            <div className='page-title'>Социальные сети</div>
            <div className='page-description'>Введите свои действуйющие ссылки на социальные сети и количество подписчиков.</div>


            <form className="form-social-nerwork" onSubmit={handleSubmit(sendForm)}>


                <div className="social-network-flex">
                    <div className="form-block w50">
                        <label className='form-label'>Сайт / Приложение</label>
                        <select {...register('socialNetwork')} className='form-control'>
                            <option value="">Выбрать</option>
                            <option value="vk">ВКонтакте</option>
                            <option value="whatApp">WhatsApp</option>
                            <option value="youtobe">YouTube</option>
                            <option value="classmates">Одноклассники</option>
                            <option value="Facebook">Facebook</option>
                        </select>
                    </div>



                    <div className="form-block w50">
                        <label className='form-label'>Сайт / Приложение</label>
                        <input className='form-control' type="text" placeholder='vk.com/example' {...register('application')} />
                    </div>
                </div>



                {
                    allSocialNetwork.map(item => {
                        return (
                            <div className="social-network-flex" key={Math.random()}>

                                <div className="form-block w50">
                                    <label className='form-label'>Сайт / Приложение</label>
                                    <select {...register(item.socialNetwork)} className='form-control'>
                                        <option>Выбрать</option>
                                        <option value="vk">ВКонтакте</option>
                                        <option value="whatApp">WhatsApp</option>
                                        <option value="youtobe">YouTube</option>
                                        <option value="classmates">Одноклассники</option>
                                        <option value="Facebook">Facebook</option>
                                    </select>
                                </div>


                                <div className="form-block w50">
                                    <label className='form-label'>Сайт / Приложение</label>
                                    <input className='form-control' type="text" placeholder='vk.com/example' {...register(item.application)} />
                                </div>

                            </div>
                        )
                    })
                }


                <div className="add-social-network" onClick={() => { newSocialNetwork() }}>+ Добавить социальную сеть</div>


                <div className='form-bottom w100'>
                    <div onClick={() => navigate(-1)} className="button-back">
                        <div>Назад</div>
                    </div>
                    <button type="submit" className="button-next">Сохранить</button>
                </div>


            </form>




        </div>
    )
}

export default Step5