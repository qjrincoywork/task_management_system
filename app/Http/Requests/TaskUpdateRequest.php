<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => [
                'required',
                'integer',
                Rule::exists(Task::class, 'id')->where('user_id', auth()->id())->whereNull('deleted_at')
            ],
            'title' => [
                'required',
                Rule::unique(Task::class, 'title')->ignore($this['id']),
                'string',
                'max:100'
            ],
            'content' => [
                'required',
                'string',
                'max:255'
            ],
            'image' => [
                'nullable',
                'string'
            ],
            'status' => [
                'required',
                'integer',
                Rule::in(TaskStatus::LIST)
            ],
        ];
    }
}
