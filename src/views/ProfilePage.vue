<script>
    const NameSubscription = "Base"
</script>
<template>
    <div class="section" id="profile">
        <div class="container">
            <div class="card">
                <div class="group-form-input">
                    <label for="">Photo Profile</label>
                    <input class="input-form-default" type="file" placeholder="Select your image profile">
                </div>
                <div class="group-form-input">
                    <label for="">Name</label>
                    <input class="input-form-default" type="text" id="name" >
                </div>
                <div class="group-form-input">
                    <label for="">Surname</label>
                    <input class="input-form-default" type="text" id="surname">
                </div>
                <div class="group-form-input">
                    <label for="">Email</label>
                    <input class="input-form-default" type="text" id="email">
                </div>
                <div class="group-form-input">
                    <label for="">Password</label>
                    <input class="input-form-default" type="text" id="password">
                </div>
                <button class="btn-create">Submit</button>
            </div>
        </div>
        <div class="container">
            <div class="card">
                <table>
                    <thead>
                        <th>
                            <td>#ID</td>
                            <td>INVOICE</td>
                            <td>ACTIONS</td>
                        </th>
                    </thead>
                    <tbody>
                        <th></th>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="container">
            <div class="card">
                Your Plan Subscription : {{ NameSubscription }}
            </div>
        </div>
    </div>
</template>
