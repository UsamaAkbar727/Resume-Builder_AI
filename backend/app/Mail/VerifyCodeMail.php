<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;
    public $typeLabel;

    /**
     * Create a new message instance.
     */
    public function __construct($code, $typeLabel)
    {
        $this->code = $code;
        $this->typeLabel = $typeLabel;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Your ResumeFlow Security Code: {$this->code}",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            htmlString: "
                <div style='font-family: sans-serif; padding: 24px; max-width: 600px; margin: auto; background-color: #fbfbfc; border: 1px solid #e4e4e7; border-radius: 12px;'>
                    <h2 style='color: #4f46e5; margin-bottom: 8px;'>ResumeFlow Security</h2>
                    <p style='color: #3f3f46; font-size: 14px;'>Hello,</p>
                    <p style='color: #3f3f46; font-size: 14px;'>You requested a code for <strong>{$this->typeLabel}</strong>. Use the secure code below to proceed. This code is valid for 15 minutes and can only be used once.</p>
                    <div style='background-color: #e0e7ff; color: #4338ca; font-size: 32px; font-weight: bold; text-align: center; padding: 16px; border-radius: 8px; letter-spacing: 4px; margin: 24px 0;'>
                        {$this->code}
                    </div>
                    <p style='color: #71717a; font-size: 12px;'>If you did not make this request, please secure your credentials immediately.</p>
                </div>
            "
        );
    }
}
