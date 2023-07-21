import nodemailer from 'nodemailer';

const transporter =nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'saumyaagarw@gmail.com',
        pass: 'nohduxkzcebufchr',
    }
});

function sendvMail(email){
    
    const currentUrl="http://localhost:5000/api/users/"
    const mailOptions={
        from: '"Suyash Singhal" <saumyaagarw@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>Verify your Email ddress to complete the registration process.</p>
                <b>Click <a href =${currentUrl + "user/verify/"+email}>here</a> to complete the verification process.</b>`
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error('Error sending email:',error);
        }
        else{
            console.log('Email sent:',info.response);
        }
    });
}
export {sendvMail}



