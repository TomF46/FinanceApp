<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Enums\Roles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdmin()
    {
        return $this->role == Roles::Administrator;
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'fullName' => "{$this->firstName} {$this->lastName}",
            'email' => $this->email,
            'role' => $this->role,
            "roleTitle" => $this->getRoleTitle()
        ];
    }

    public function getRoleTitle()
    {
        switch ($this->role) {
            case Roles::Administrator:
                return "Administrator";
                break;
            case Roles::HeadOffice:
                return "Head Office";
                break;
            case Roles::AreaManager:
                return "Area Manager";
                break;
            case Roles::RetailManager:
                return "Retail Manager";
                break;
            default:
                return "Unassigned";
        }
    }
}
