import { useState } from 'react'


const Dropzone = (props) => {

    // Загрузка картинки
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('Выберите или перетащите файл')

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const newFile = event.dataTransfer.files[0]
        setFile(newFile)
        setFileName(newFile.name)

        // Передадим сам файл наверх
        props.updateData(newFile)
    }
    const handleFileInputChange = (event) => {
        const newFile = event.target.files[0]
        if (newFile !== undefined) {
            setFile(newFile)
            setFileName(newFile.name)

            // Передадим сам файл наверх
            props.updateData(newFile)
        }
    }
    const deleteFile = (e) => {
        e.preventDefault()
        setFile(null)
        // Удалим файл наверху
        props.updateData(null)
        setFileName('Выберите или перетащите файл')
    }

    // Функция которая присваивает класс, в зависимости от того - загружен ли файл
    const checkFile = () => {
        if (file === null) {
            return 'dropzone dropzone-no-file'
        }
        else {
            return 'dropzone'
        }
    }



    return (

        


            <label className={checkFile()} onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className='ok-file'>
                    {
                        file !== null &&
                        <div>
                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.872869 5.23438L2.11932 3.96236L5.35369 7.15199L12.1996 0.331676L13.4652 1.60369L5.35369 9.68324L0.872869 5.23438Z"
                                    fill="#16BB5B" />
                            </svg>
                        </div>
                    }
                    {fileName}
                </div>
                {
                    file !== null &&
                    <div className="delete-file" onClick={(e) => { deleteFile(e) }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_203_1620)">
                                <rect x="0.34375" y="1.75781" width="2" height="14" rx="1" transform="rotate(-45 0.34375 1.75781)"
                                    fill="#FB5454" />
                                <rect x="1.75781" y="11.6565" width="2" height="14" rx="1" transform="rotate(-135 1.75781 11.6565)"
                                    fill="#FB5454" />
                            </g>
                            <defs>
                                <clipPath id="clip0_203_1620">
                                    <rect width="12" height="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                }
                <input type="file" accept="image/*" onChange={handleFileInputChange} style={{ display: 'none' }} />
            </label>


       
    )
}

export default Dropzone