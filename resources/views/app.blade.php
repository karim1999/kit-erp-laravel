<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>KIT | ERP</title>
    <!-- Semantic CSS -->
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/bootstrap.min.css')}}">

    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="{{asset('assets/css/custom.css')}}">

    <!-- Datepicker -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('/js/app.js') }}" defer></script>
    <style>
        a:disabled,               /* This doesn't do anything, but hopefully one day ... */
        a[disabled]               /* This activates when the disabled attribute is added. */
        {
            cursor: not-allowed;  /* Indicate that the link is not to be click! */
            background-color: #eeeeee;
        }
    </style></head>
<body>
@inertia
<script src="{{asset('assets/js/jquery-3.1.1.min.js')}}"></script>
<script src="{{asset('assets/js/bootstrap.bundle.min.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<script>
    $(document).ready(function() {
        $(".datetime-picker").flatpickr({
            enableTime: true
        });

        $(".date-picker").flatpickr();
    });
</script>

</body>
</html>
