<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ApplicationRevision;
use App\Models\User;

class RejectionMessage extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table = 'rejection_messages';
    protected $fillable = [
        'application_revision_id',
        'user_id',
        'message'
    ];

    public function applicationRevision()
    {
        return $this->belongsTo(ApplicationRevision::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function map()
    {
        return [
            'by' => $this->user->getFullName(),
            'message' => $this->message
        ];
    }

}
