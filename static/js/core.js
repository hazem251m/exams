

  
  
  $("#officers_attendence_table").on("click", "button", function () {
    const csrf = document.getElementsByName("csrfmiddlewaretoken");
    var objectId = $(this).data("id");
    data = {
      record_id: objectId,
      csrfmiddlewaretoken: csrf[0].value,
    };
    $.ajax({
      type: "POST",
      url: "exit/",
      data: data,
      success: function () {
        document.location.reload();
      },
    });
  });
  
  
  
  
  
  $(document).on("submit", "#civiliansVehiclesVisitsForm", function (e) {
    e.preventDefault();
    const csrf = document.getElementsByName("csrfmiddlewaretoken");
    $personName = $("#personName").val();
    $personJob = $("#personJob").val();
    $vehicle_number = $("#vehicle_number").val();
    $vehicle_model = $("#vehicle_model").val();
    $driver_name = $("#driver_name").val();
    $department = $("#department").val();
    if ($vehicle_number == "" || $personName == "" ||$personJob=="") {
      $('#vehicle_number').attr('placeholder', 'يجب إدخال رقم السيارة').css('color', 'red');
      $('#vehicle_number').css('border', '1px solid #ff0000');
      // Add similar code for personName and personJob fields
      $('#personName').attr('placeholder', 'يجب إدخال اسم الشخص').css('color', 'red');
      $('#personName').css('border', '1px solid #ff0000');
      $('#personJob').attr('placeholder', 'يجب إدخال وظيفة الشخص').css('color', 'red');
      $('#personJob').css('border', '1px solid #ff0000');
    } else {
      $('#vehicle_number').removeAttr('placeholder').css('color', '');
      $('#vehicle_number').css('border', '');
      $('#personName').removeAttr('placeholder').css('color', '');
      $('#personName').css('border', '');
      $('#personJob').removeAttr('placeholder').css('color', '');
      $('#personJob').css('border', '');
      var formData = {
        personName: $personName,
        personJob: $personJob,
        vehicle_number:$vehicle_number,
        vehicle_model:$vehicle_model,
        driver_name:$driver_name,
        department: $department,
        csrfmiddlewaretoken: csrf[0].value,
      };
      $.ajax({
        type: "POST",
        url: "insert_civilian_vehicle_visit",
        data: formData,
        success: function (response) {
          data = response.visits;
          $("#civiliansVisitsForm").trigger("reset");
          if ((response.status = "تم تسجيل الزيارة")) {
            $("#message").text(response.status);
            $("#message").addClass("bg-success");
            $("#message").addClass("p-2");
            $("#message").css("color", "white");
            $("#message").delay(3000).fadeOut();
            setTimeout(() => {
              document.location.reload();
            }, 2000);
          }
        },
      });
    }
  });
  
  
  
  $(document).on("submit", "#militaryVehiclesVisitsForm", function (e) {
    e.preventDefault();
    const csrf = document.getElementsByName("csrfmiddlewaretoken");
    $rank = $("#rank").val();
    $personName = $("#personName").val();
    $department = $("#department").val();
    $vehicle_number = $("#vehicle_number").val();
    $vehicle_model = $("#vehicle_model").val();
    $driver_rank = $("#driver_rank").val();
    $driver_name = $("#driverName").val();
    $task_destination = $("#task_destination").val();
    $officer_in  = $("#officer_in_vehicle").is(":checked");  
    if ($vehicle_number == "") {
      $('#vehicle_number').attr('placeholder', 'يجب إدخال رقم السيارة').css('color', 'red');
      $('#vehicle_number').css('border', '1px solid #ff0000');
    } else {
      var formData = {
        rank:$rank,
        personName:$personName,
        department:$department,
        vehicle_number:$vehicle_number,
        vehicle_model:$vehicle_model,
        driver_rank:$driver_rank,
        driver_name:$driver_name,
        task_destination:$task_destination,
        officer_in:$officer_in,
        csrfmiddlewaretoken: csrf[0].value,
      };
      $.ajax({
        type: "POST",
        url: "insert_military_vehicle",
        data: formData,
        success: function (response) {
          data = response.visits;
          $("#civiliansVisitsForm").trigger("reset");
          if ((response.status = "تم تسجيل دخول المركبة")) {
            $("#message").text(response.status);
            $("#message").addClass("bg-success");
            $("#message").addClass("p-2");
            $("#message").css("color", "white");
            $("#message").delay(3000).fadeOut();
            setTimeout(() => {
              document.location.reload();
            }, 2000);
          }
        },
      });
    }
  });
  
  
  

  
  $(document).on("submit", "#taskForm", function (e) {
    e.preventDefault();
    var tableData = [];
    var headers = [];
    $('#task_people thead th').each(function() {
      headers.push($(this).text());
    });
    $('#task_people tbody tr').each(function() {
      var rowData = [];
      $(this).find('td').slice(0, 2).each(function(col, cell) {
        rowData.push($(this).text());
      });
      tableData.push(rowData);
    });
    const csrf = document.getElementsByName("csrfmiddlewaretoken");
    $rank = $("#rank").val();
    $personName = $("#personName").val();
    $unit = $("#unit").val();
    $personId = $("#personId").val();
    $department = $("#department").val();
    $attendenceNotes = $("#attendenceNotes").val();
    $taskType = $("#taskType").val();
    $tools = $("#tools").val();
    $vehicle_number = $("#vehicle_number").val();
    if ($personName == "") {
      $('#personName').attr('placeholder', 'ادخل اسم الشخص');
      $('#personName').css('border', '1px solid #ff0000');
    } else {
      var formData = {
        rank:$rank,
        personName:$personName,
        unit:$unit,
        personId:$personId,
        department:$department,
        vehicle_number:$vehicle_number,
        attendenceNotes:$attendenceNotes,
        taskType:$taskType,
        tools:$tools,
        table_data:JSON.stringify(tableData),
        csrfmiddlewaretoken: csrf[0].value,
      };
      $.ajax({
        type: "POST",
        url: "insert_task",
        data: formData,
        success: function (response) {
          toastr["success"]("تم تسجيل خؤوج المأمورية", "عملية ناجحة");
            setTimeout(() => {
              document.location.reload();
            }, 2000);
        },
      });
    }
  });
  
  

  
  

  
  $("#holidays_table").on("click", "button", function () {
    const csrf = document.getElementsByName("csrfmiddlewaretoken");
    var objectId = $(this).data("id");
    data = {
      record_id: objectId,
      csrfmiddlewaretoken: csrf[0].value,
    };
    $.ajax({
      type: "POST",
      url: "complete_holiday_request/",
      data: data,
      success: function () {
        document.location.reload();
      },
    });
  });
  
  
  
  
  $(document).on("submit", "#companyForm", function (e) {
    e.preventDefault();
    var formData = new FormData();
    const csrf = document.getElementsByName("csrfmiddlewaretoken");
    $company_name = $("#company_name").val();
    $visit_start_date= $("#visit_start_date").val();
    $visit_end_date= $("#visit_end_date").val();
    $department= $("#department").val();
    $responsible_officer= $("#responsible_officer").val();
    $request_reasons = $("#request_reasons").val();
    $details = $("#details").val();
    $attachements = $(".attachement_files")[0].files;
    formData.append('company_name', $company_name);
    formData.append('visit_start_date', $visit_start_date);
    formData.append('visit_end_date', $visit_end_date);
    for (var i = 0; i < $attachements.length; i++) {
      formData.append('files', $attachements[i]);
    }
    formData.append('department', $department);
    formData.append('officer', $responsible_officer);
    formData.append('request_reasons', $responsible_officer);
    formData.append('details', $details);
  formData.append('csrfmiddlewaretoken', csrf[0].value);
  
  var tableData = [];
  // Get the table headers
  
  // Iterate through each row in the table
  $('#company_employees tbody tr').not(':first').each(function() {
    var firstCellData = $(this).find('td:first').text();
    tableData.push(firstCellData);
  });
  
  formData.append('table_data',JSON.stringify(tableData));
    if ($("#companyForm").valid() ) {
      $.ajax({
        type: "POST",
        url: "",
        data: formData,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        success: function (response) {
          data = response.visits;
          $("#companyForm").trigger("reset");
          if ((response.status = "تم تسجيل طلب الزيارة وجاري مراجعة التصديق الامني")) {
            toastr["success"]("تم حفظ طلب الشركة", "عملية ناجحة");
            setTimeout(() => {
              document.location.reload();
            }, 2000);
          }
        },
      });
    }
  });
  
  
  
