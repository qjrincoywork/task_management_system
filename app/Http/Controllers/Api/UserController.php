<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\{LoginRequest, RegisterRequest};
use App\Models\User;
use Illuminate\Http\{JsonResponse, Request};
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * User model instance.
     *
     * @var User
     */
    protected $user;

    /**
     * UserController constructor.
     * @param User $user
     *
     * @return void
     */
    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * Register a user.
     * @param RegisterRequest $request The register request object.
     *
     * @return JsonResponse The JSON response with the success message.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->user->registerUser($request->all());

        return response()->json([
            'message' => 'Successfully Registered.',
            'token' => $user->createToken(env('API_AUTH_TOKEN_NAME'))->plainTextToken,
        ], Response::HTTP_OK);
    }

    /**
     * Login a user.
     * @param LoginRequest $request The login request object.
     *
     * @return JsonResponse The JSON response with the user token if login is successful,
     * or an error message if login fails.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            return response()->json([
                'user' => auth()->user(),
                'token' => auth()->user()->createToken(env('API_AUTH_TOKEN_NAME'))->plainTextToken
            ]);
        } else {
            return response()->json(['message' => 'Provided email or password is invalid.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Logout a user by deleting the current access token.
     *
     * @return JsonResponse The JSON response with HTTP status code 204 (NO CONTENT).
     */
    public function logout(): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->json('', Response::HTTP_NO_CONTENT);
    }
}
