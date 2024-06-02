<?php

namespace App\Http\Requests;

use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class TaskCreateRequest extends FormRequest
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
            'title' => [
                'required',
                Rule::unique(Task::class, 'title'),
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
