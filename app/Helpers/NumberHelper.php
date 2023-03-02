<?php

namespace App\Helpers;

class NumberHelper
{
    public static function asMoney($value)
    {
        return number_format($value, 2, '.', '');
    }

    public static function asMoneyText($value)
    {
        return "£" . number_format($value, 2, '.', '');
    }
}