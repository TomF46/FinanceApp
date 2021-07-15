<?php

namespace App\Helpers;

class NumberHelper
{
    public static function asMoney($value)
    {
        return number_format($value, 2, '.', '');
    }
}