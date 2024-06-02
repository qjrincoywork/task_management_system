import React from 'react';
import ReactDOM from 'react-dom/client';

function Login() {
    return (
        // <div className="container">
        //     <div className="row justify-content-center">
        //         <div className="col-md-8">
        //             <div className="card">
        //                 <div className="card-header">This is Login</div>

        //                 <div className="card-body">I'm an d component!</div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <main class='project'>
            <div class='project-info'>
                <h1>Dashboard Design</h1>
                <div class='project-participants'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <button class='project-participants__add'>Add Participant</button>

                </div>
            </div>
            <div class='project-tasks'>
                <div class='project-column'>
                    @include('backlog')
                </div>
                <div class='project-column'>
                    @include('in_progress')
                </div>
                <div class='project-column'>
                    @include('done')
                </div>
            </div>
        </main>
    );
}

export default Login;

if (document.getElementById('login')) {
    const Index = ReactDOM.createRoot(document.getElementById('login'));

    Index.render(
        <React.StrictMode>
            <Login/>
        </React.StrictMode>
    )
}
