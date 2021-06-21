<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Roles extends Enum
{
    const Administrator = 0;
    const HeadOffice = 1;
    const AreaManager = 2;
    const RetailManager = 3;
    const Unassigned = 4;
}
