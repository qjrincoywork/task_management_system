<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Http\Requests\{TaskCreateRequest, TaskDeleteRequest, TaskListRequest, TaskUpdateRequest};
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    /**
     * Task model instance.
     *
     * @var Task
     */
    protected $task;

    /**
     * TaskController constructor.
     *
     * @param Task $task
     *
     * @return void
     */
    public function __construct(Task $task) {
        $this->task = $task;
    }

    /**
     * Retrieves a listing of tasks.
     * @param TaskListRequest $request The request object.
     *
     * @return JsonResponse The JSON response containing the tasks.
     */
    public function index(TaskListRequest $request): JsonResponse
    {
        dd('hits');
        $params = $request->all();
        $tasks = $this->task->getTasks($params);

        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     * @param TaskCreateRequest $request The request object.
     *
     * @return JsonResponse The JSON response containing the message.
     */
    public function store(TaskCreateRequest $request): JsonResponse
    {
        $this->task->saveUserTask($request->all());

        return response()->json(['message' => __('Task Created.')], Response::HTTP_OK);
    }

    /**
     * Retrieves and returns the specified task.
     * @param int $id The ID of the task to retrieve.
     *
     * @return JsonResponse The JSON response containing the task.
     */
    public function show(int $id): JsonResponse
    {
        return response()->json(auth()->user()->tasks()->with('subTasks')->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     * @param TaskUpdateRequest $request The request object.
     *
     * @return JsonResponse The JSON response containing the message.
     */
    public function update(TaskUpdateRequest $request): JsonResponse
    {
        $this->task->saveUserTask($request->all());

        return response()->json(['message' => __('Task Updated.')], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     * @param TaskDeleteRequest $request The request object.
     *
     * @return JsonResponse The JSON response containing the message.
     */
    public function destroy(TaskDeleteRequest $request): JsonResponse
    {
        auth()->user()->tasks()->find($request['id'])->delete();

        return response()->json(['message' => __('Task Deleted.')], Response::HTTP_OK);
    }
}
