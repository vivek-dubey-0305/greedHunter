import React from 'react'
import { useUserContext } from '../context/UserContext'

const SendMailtoTopTen = () => {

    const {sendTopUserEmails} = useUserContext()
  return (
    <button
  className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg transition-all shadow-lg cursor-pointer"
  onClick={sendTopUserEmails}
>
  Send Emails to Top 10
</button>

  )
}

export default SendMailtoTopTen