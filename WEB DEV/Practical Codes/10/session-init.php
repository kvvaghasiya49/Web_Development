<?php
session_set_cookie_params(array(
    'httponly' => true,
    'samesite' => 'Lax'
));

session_start();
