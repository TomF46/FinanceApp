<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ApplicationPriority extends Enum
{
    const Low = 0;
    const Medium = 1;
    const High = 2;
    const Severe = 3;
}
