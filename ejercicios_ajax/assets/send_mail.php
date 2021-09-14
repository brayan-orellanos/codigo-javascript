<?php

if(isset($_POST)) {
    error_reporting(0);

    $name = $_POST["name"];
    $email = $_POST["email"];
    $asunto = $_POST["asunto"];
    $comentario = $_POST["comentario"];

    $domain = $_SERVER["HTTP_HOST"];
    $to = "xnoverz99@gmail.com";
    $asunto = "Contacto desde el formulario desde el sitio $domain: $asunto";
    $message = "
        <p>Datos enviados desde el formulario del sitio <b>$domain</b></p>
        <ul>
            <li>Nombre: <b>$name</b></li>
            <li>Correo: <b>$email</b></li>
            <li>Asunto: $asunto</li>
            <li>Comentario: $comentario</li>
        </ul>
    ";

    $headers = "MIME-Version: 1.0\r\n"."Content-Type: text/html; charset=utf-8\r\n"."From: Envio Automatico, No responder <no-reply@$domain>";

    $send_mail = mail($to, $asunto, $message, $headers);

    if($send_mail) {
        $res = [
            "err" => false,
            "message" => "Tus datos han sido enviado"
        ];
    } else {
        $res = [
            "err" => true,
            "message" => "Error; no se ha podido enviar la informacion"
        ];
    };

    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    echo json_encode($res);
    exit;
};