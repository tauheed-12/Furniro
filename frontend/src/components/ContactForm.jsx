const inputCss = 'border-solid border-[1px] border-black text-lg px-5 py-2 rounded-xl w-full';
const labelCss = 'text-lg font-semibold mb-2';
const inputDivCss = 'flex flex-col justify-start items-start w-full';

const ContactForm = ()=>{
    <form className='flex-1 flex flex-col w-full px-6 md:pr-10 gap-6'>
        <div className={inputDivCss}>
            <label className={labelCss}>Your name</label>
            <input type='text' placeholder='abc' className={inputCss} />
        </div>
        <div className={inputDivCss}>
            <label className={labelCss}>Email address</label>
            <input type='email' placeholder='abc@gmail.com' className={inputCss} />
        </div>
        <div className={inputDivCss}>
            <label className={labelCss}>Subject</label>
            <input type='text' placeholder='This is optional' className={inputCss} />
        </div>
        <div className={inputDivCss}>
            <label className={labelCss}>Message</label>
            <textarea placeholder="Hi, I'd like to ask about" className={inputCss} />
        </div>
        <button className='self-center px-7 text-lg py-2 border-2 border-black rounded-2xl mt-8 hover:bg-primary hover:text-white'>
            Submit
        </button>
    </form>
}

export default ContactForm;