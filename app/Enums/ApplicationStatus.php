<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ApplicationStatus extends Enum
{
    const NotSubmitted = 0;
    const Submitted = 1;
    const Returned = 2;
    const Accepted = 3;
    const Inactive = 4;
}
