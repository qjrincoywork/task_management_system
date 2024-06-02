<?php

namespace App\Models;

use App\Enums\{SortOrder, TaskSortTarget, TaskStatus};
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\{Model, SoftDeletes};
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};

class Task extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'image',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'updated_at',
        'deleted_at',
    ];

    /**
     * Get the task's status.
     *
     * @return Attribute The published status attribute.
     */
    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn (int $value) => TaskStatus::LIST_NAME[$value],
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::parse($value)->format('M d Y g:iA'),
        );
    }

    /**
     * Get the user who created the task.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the sub tasks of the current task.
     *
     * @return HasMany The sub tasks.
     */
    public function subTasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Retrieves tasks based on the given parameters.
     * @param array $params The parameters for retrieving tasks.
     *      - sort_target (string|null): The target for sorting the tasks. Defaults to TaskSortTarget::TITLE.
     *      - sort_order (string|null): The order for sorting the tasks. Defaults to SortOrder::DESC.
     *      - per_page (int): The number of tasks per page for pagination.
     *
     * @return LengthAwarePaginator The paginated tasks.
     */
    public function getTasks(array $params): LengthAwarePaginator
    {
        $tasks = auth()->user()->tasks()
            ->when(isset($params['title']), function ($query) use ($params) {
                $query->where('title', 'LIKE', '%' . $params['title'] . '%');
            })
            ->orderBy(
                $params['sort_target'] ?? TaskSortTarget::DATE_CREATED,
                $params['sort_order'] ?? SortOrder::DESC
            )
            ->when(isset($params['status']), function ($query) use ($params) {
                $query->where('status', $params['status']);
            })
            ->whereNull('task_id')
            ->paginate($params['per_page'] ?? config('tasks.default_limit'));

        return $tasks;
    }

    /**
     * Saves a user task.
     * If the task data contains an 'id' field, it updates the corresponding task in the database.
     * Otherwise, it creates a new task with the provided data and assigns it to the current user.
     * @param array $data The task data.
     *      - id (int|null): The ID of the task to update. Defaults to null.
     *      - Any other task fields to update or create.
     *
     * @return void
     */
    public function saveUserTask(array $data): void
    {
        if (isset($data['id'])) {
            auth()->user()->tasks()->find($data['id'])->update($data);
        } else {
            $taskData = $data + ['user_id' => auth()->id()];
            auth()->user()->tasks()->create($taskData);
        }
    }
}
