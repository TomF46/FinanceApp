<?php

namespace Tests\Helpers;

class TestHelper
{
    public static function getBearerTokenForUser($user)
    {
        $pat = $user->createToken('Personal Access Token');
        return $pat->accessToken;
    }
}