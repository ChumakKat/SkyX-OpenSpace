<?php

header('Content-type: text/html');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
//use PHPMailer\PHPMailer\SMTP;

require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/Exception.php";
//require "PHPMailer/src/SMTP.php";

$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';
$mail->setLanguage('ru', 'PHPMailer/language/');
$mail->isHTML(true);  

//$mail-> isSMTP();

$mail->setFrom('muzkat@mail.com', 'Заявка с сайта'); // от кого будет уходить письмо?
$mail->addAddress('gf.muzkat@gmail.com');     // Кому будет уходить письмо 
$mail->Subject = 'Заявка на экскурсию в SkyX!';

$name = $_POST['name'];
$soname = $_POST['soname'];
$email = $_POST['email'];
$organ = $_POST['organ'];



// Тело письам
$body = '<h1>Заявка на экскурсию в SkyX</h1>';

if(trim(!empty($name))){
    $body.='<p><strong>Имя:</strong> '.$name.'</p>';
}
if(trim(!empty($soname))){
    $body.='<p><strong>Фамилия:</strong> '.$soname.'</p>';
}
if(trim(!empty($email))){
    $body.='<p><strong>Email:</strong> '.$email.'</p>';
}
if(trim(!empty($organ))){
    $body.='<p><strong>Название организации:</strong> '.$organ.'</p>';
}



$mail->Body = $body; //Отправка

if (!$mail->send()) {
    echo 'Ошибка: '.$mail->ErrorInfo;
} else {
    echo '!OK!';
}

?>