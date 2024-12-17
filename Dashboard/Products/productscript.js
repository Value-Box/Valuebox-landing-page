$(".select-dropdown").select2();

  
  // Form submission or button click validation
  $("#addProNextBtn").on("click", function () {
    // If valid, proceed further
    $("#basicInformationForm").hide();
    $("#addProductSection").show();
  });

  // YouTube URL validation on input
  $("#utubeUrl").on("input", function () {
    const youtubeUrl = $(this).val();
    const youtubePattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/)([a-zA-Z0-9_-]{11})$/;

    if (!youtubePattern.test(youtubeUrl)) {
      $("#errorMessage").show(); // Show error message
    } else {
      $("#errorMessage").hide(); // Hide error message
    }
  });



        //video preview in modal
    const $modalVideo = $('#modalVideo');
    const $modalVideoSource = $modalVideo.find('source');
  
    // Handle thumbnail clicks
    $('.video-thumbnail').on('click', function () {
      const videoSrc = $(this).data('video');
      $modalVideoSource.attr('src', videoSrc);
      $modalVideo[0].load(); // Load video in modal but do not play automatically
    });
  
    // Stop video playback and reset source when modal is closed
    $('#videoModal').on('hidden.bs.modal', function () {
      $modalVideo[0].pause();
      $modalVideo[0].currentTime = 0; // Reset video to the beginning
      $modalVideoSource.attr('src', ''); // Clear the video source
    });
  
      // Initialize Select2
  
      $('#fbmTable tbody tr').show();
  
        // Handle Select2 change event
        $('#locationDropdown').on('change', function () {
          const selectedValue = $(this).val();
  
          if (selectedValue === 'all') {
            // Show all rows when "All" is selected
            $('#fbmTable tbody tr').show();
          } else {
            // Show only the row matching the selected location
            $('#fbmTable tbody tr').hide();
            $(`#fbmTable tbody tr[data-location="${selectedValue}"]`).show();
          }
        });
      // Listen for change event on Select2
      $("#brandSelector").on("select2:select", function (e) {
          const value = $(this).val(); // Get the selected value
          if (value === "addNew") {
              // Open the new page in a new tab
              window.open("../Products/BasicInformation.html", "_blank");
  
              // Reset the dropdown value back to "Not Brand"
              setTimeout(() => {
                  $(this).val("none").trigger("change"); // Reset and trigger change
              }, 0);
          }
      });

  // Classic editor
        ClassicEditor.create(document.querySelector('#productDesc'))
            .catch(error => {
                console.error(error);
            });
            ClassicEditor
            .create(document.querySelector('#highlight'))
            .catch(error => {
                console.error(error);
            });
  

            //upload images with preview
          function handleFileUpload(inputId, containerId, errorContainerId) {
          $("#" + inputId).on("change", function(event) {
          const files = event.target.files;
          const previewContainer = $("#" + containerId);
          const errorContainer = $("#" + errorContainerId);
  
          // Clear existing previews and error messages
          previewContainer.empty();
          errorContainer.empty().hide();
  
          let isValid = true;
          let errorMessage = "";
  
          // Allowed formats
          const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
          const maxFileSize = 512000; // 500KB
  
          // Check all files before displaying previews
          $.each(files, function(index, file) {
              if (!allowedFormats.includes(file.type)) {
                  isValid = false;
                  errorMessage += `File \"${file.name}\" is not in an allowed format (JPG, PNG, WEBP).\n`;
                  return false; // Stop processing further files
              }
              if (file.size > maxFileSize) {
                  isValid = false;
                  errorMessage += `File \"${file.name}\" exceeds the maximum size of 500KB.\n`;
                  return false; // Stop processing further files
              }
          });
  
          if (!isValid) {
              // Show error message if any file is invalid
              const errorElement = $("<div>").addClass("error-message").css("color", "red").text(errorMessage);
              errorContainer.append(errorElement).show();
          } else {
              // Process files and display previews if all files are valid
              $.each(files, function(index, file) {
                  const reader = new FileReader();
  
                  // Create a container for each image
                  const fileContainer = $("<div>").addClass("file-container").css({
                      "display": "inline-block",
                      "margin": "5px",
                      "position": "relative"
                  });
  
                  // Create a file preview (image)
                  const filePreview = $("<div>").addClass("file-preview");
  
                  // Create a button for removing the file
                  const removeBtn = $("<button>").addClass("remove-btn").text("X").css({
                      "cursor": "pointer"
                  });
                  removeBtn.on("click", function() {
                      fileContainer.remove(); // Remove the file container
                  });
  
                  // Create a label for the file name
                  const fileName = $("<div>").addClass("file-name").text(file.name);
  
                  // Check if the file is an image
                  if (file.type.startsWith("image")) {
                      const img = $("<img>").addClass("w-100px rounded-2").css({
                          "width": "100px",
                          "border-radius": "4px"
                      });
  
                      // Load the image
                      reader.onload = function(e) {
                          img.attr("src", e.target.result);
                      };
                      reader.readAsDataURL(file);
  
                      // Append image and remove button to the container
                      filePreview.append(img);
                  }
  
                  // Append elements to the container
                  fileContainer.append(filePreview);
                  fileContainer.append(removeBtn); // Add remove button
                  fileContainer.append(fileName);
  
                  // Add the file container to the preview container
                  previewContainer.append(fileContainer);
              });
          }
      });
  }
  
  // Attach event listeners to file inputs
  handleFileUpload("uploadImgSecinput", "previewContainer", "errorContainerUpload");
  handleFileUpload("medCenImg", "medCenPreviewContainer", "errorContainerMedCen");
  
  
  
  // function handleVideoUpload(inputId, containerId, errorMessage) {
  //   $("#" + inputId).on("change", function(event) {
  //     var $videoPreviewContainer = $(`#${containerId}`);
  //     var files = event.target.files; // Corrected variable name
  
  //     // Clear previous previews and errors
  //     $videoPreviewContainer.empty();
  
  //     for (var i = 0; i < files.length; i++) {
  //       var file = files[i];
  
  //       // Validate file type (MP4 only)
  //       if (file.type !== "video/mp4") {
  //         var typeErrorElement = $('<div>', {
  //           'class': 'error-message',
  //           'text': 'Only MP4 videos are allowed.' // Error message for invalid file type
  //         });
  //         $videoPreviewContainer.append(typeErrorElement);
  //         continue; // Skip this file
  //       }
  
  //       // Check if the file is larger than 5MB
  //       if (file.size > 5242880) {
  //         var sizeErrorElement = $('<div>', {
  //           'class': 'error-message',
  //           'text': errorMessage || 'Your file is too large! Maximum allowed size is 5MB.' // Error message for large file
  //         });
  //         $videoPreviewContainer.append(sizeErrorElement);
  //         continue; // Skip this file
  //       }
  
  //       // If file type and size are valid, show video preview
  //       var videoElement = $('<video>', {
  //         'controls': true,
  //         'width': '300',
  //         'class': 'videoPreview',
  //         'src': URL.createObjectURL(file) // Create a local object URL for the video
  //       });
  
  //       var removeButton = $('<button>', {
  //         'class': 'remove-video',
  //         'text': 'X' // Button to remove the video preview
  //       });
  
  //       var fileName = $('<div>', {
  //         'class': 'file-name',
  //         'text': file.name // Display the file name
  //       });
  
  //       // Append video preview with file name and remove button
  //       var videoWrapper = $('<div>', { 'class': 'video-wrapper' }).append(videoElement, fileName, removeButton);
  //       $videoPreviewContainer.append(videoWrapper);
  
  //       // Remove video preview functionality
  //       removeButton.on('click', function () {
  //         $(this).closest('.video-wrapper').remove();
  
  //         // Reset the file input so the same file can be uploaded again
  //         $(`#${inputId}`).val('');
  //       });
  //     }
  //   });
  // }

  function handleVideoUpload(inputId, containerId, errorContainerId) {
    $("#" + inputId).on("change", function (event) {
      const files = event.target.files;
      const previewContainer = $("#" + containerId);
      const errorContainer = $("#" + errorContainerId);
  
      // Clear existing previews and error messages
      previewContainer.empty();
      errorContainer.empty().hide();
  
      // Allowed formats and file size
      const allowedFormats = ["video/mp4"];
      const maxFileSize = 5242880; // 5MB
      let isValid = true;
  
      // Check all files and display previews or errors
      $.each(files, function (index, file) {
        if (!allowedFormats.includes(file.type)) {
          isValid = false;
          const errorMessage = `Only MP4 videos are allowed. Please upload a valid MP4 video file.`;
          errorContainer.append($("<div>").addClass("error-message").css("color", "red").text(errorMessage));
          return false; // Stop further processing
        }
  
        if (file.size > maxFileSize) {
          isValid = false;
          const errorMessage = `File size exceeds the maximum allowed size of 5MB. Please upload a smaller file.`;
          errorContainer.append($("<div>").addClass("error-message").css("color", "red").text(errorMessage));
          return false; // Stop further processing
        }
  
        // If valid, display video preview
        const videoWrapper = $("<div>").addClass("video-wrapper").css({
          "display": "inline-block",
          "margin": "5px",
          "position": "relative"
        });
  
        const videoElement = $("<video>", {
          controls: true,
          width: 300,
          src: URL.createObjectURL(file), // Use URL.createObjectURL for video previews
          class: "video-preview"
        });
  
        const removeBtn = $("<button>").addClass("remove-btn").text("X").css({
          "position": "absolute",
          "top": "5px",
          "right": "5px",
          "cursor": "pointer"
        });
  
        removeBtn.on("click", function () {
          videoWrapper.remove(); // Remove video preview
        });
  
        const fileName = $("<div>").addClass("file-name").text(file.name);
  
        // Append video, file name, and remove button
        videoWrapper.append(videoElement, fileName, removeBtn);
        previewContainer.append(videoWrapper);
      });
  
      // Show error container if there are errors
      if (!isValid) {
        errorContainer.show();
      }
    });
  }
  
  // Initialize on DOM ready

    // Call the function to attach the change listener to the input
    handleVideoUpload("newVidFileBTn", "videoPreviewContainer", "errorMessage");
    handleVideoUpload("medCenNewVidFileBTn", "medCenVideoPreviewContainer", "medCenVidErrMes");

  

  



    // Calculate Pricing
    function calculatPricing() {
      let costPrice = parseInt($("#costPrice").val()) || 0;
      let sellingPrice = parseInt($("#sellingPrice").val()) || 0;
      let specialPrice = parseInt($("#specialPrice").val()) || 0;
      let profitElement = $("#Profit");
  
      let profit = sellingPrice - costPrice;
      let finalProfit = specialPrice - costPrice;
  
      console.log("Special Price:", specialPrice);
  
      if (specialPrice > 0) {
        if (finalProfit > 0) {
          profitElement.text(finalProfit);
        } else {
          profitElement.text("0.00");
        }
      } else {
        if (profit > 0) {
          profitElement.text(profit);
        } else {
          profitElement.text("0.00");
        }
      }
    }




  $(document).ready(function () {
    $('.varParToChild').on('click', function () {
      let $currentRow = $(this).closest('tr').next();
  
      // Traverse and toggle the 'expanded' class for all following rows with 'variant-details'
      while ($currentRow.length && $currentRow.hasClass('variant-details')) {
        $currentRow.toggleClass('expanded');
        $currentRow = $currentRow.next();
      }
  
      // Toggle the 'rotate' class on the arrow element
      $(this).find('.arrow').toggleClass('rotate');
    });
  });
  
  
  $("#editVarBtn").click(function(){
    document.location.href='VariantPage.html'
  });
  
  
      const $calendarIcon = $("#calendarIcon");
      const $tooltip = $("#tooltip");
      const $datePicker = $("#datePicker");
      const $trashIcon = $("#trashIcon");
  
      // Toggle tooltip visibility on icon click
      $calendarIcon.on("click", function (event) {
        event.stopPropagation(); // Prevent event bubbling
        $tooltip.toggleClass("active");
      });
  
      // Close tooltip when clicked outside of the calendar icon or tooltip
      $(document).on("click", function (e) {
        if (!$(e.target).closest($calendarIcon).length && !$(e.target).closest($tooltip).length) {
          $tooltip.removeClass("active");
        }
      });
  
      // Initialize date range picker
      $datePicker.daterangepicker(
        {
          opens: "center",
          locale: {
            format: "DD MMM YYYY",
          },
          autoUpdateInput: false,
        },
        function (start, end) {
          // Update the input field with the selected range
          $datePicker.val(`${start.format("DD MMM YYYY")} | ${end.format("DD MMM YYYY")}`);
          // Update the title on the calendar icon
          $calendarIcon.attr("title", `Selected Date: ${start.format("DD MMM YYYY")} - ${end.format("DD MMM YYYY")}`);
        }
      );
  
      // Clear input when the trash icon is clicked
      $trashIcon.on("click", function (e) {
        e.stopPropagation(); // Prevent closing the tooltip
        $datePicker.val("");
        $calendarIcon.attr("title", "Select a date"); // Reset the title
      });


  // Initial setup: show FBM table and section, hide FBV table
  $('#merchant').prop('checked', true);
  $('#fullByMerchant').slideDown(0); // Show instantly on page load
  $('#fbmTable').slideDown(0); // Show instantly on page load
  $('#fbvTable').slideUp(0); // Hide instantly on page load

  // Animation speed (in milliseconds)
  const animationSpeed = 200;

  // Handle FBM checkbox click
  $('#merchant').change(function () {
    if ($(this).is(':checked')) {
      // Ensure FBV is unchecked
      $('#VB').prop('checked', false);
      $('#location_fieldset').css('display', 'flex'); // Set display to flex

      // Animate FBM table and section
      $('#fullByMerchant').slideDown(animationSpeed);
      $('#fbmTable').slideDown(animationSpeed);

      // Hide FBV table
      $('#fbvTable').slideUp(animationSpeed);
    } else {
      // Ensure at least one checkbox remains checked
      $(this).prop('checked', true);
    }
  });

  // Handle FBV checkbox click
  $('#VB').change(function () {
    if ($(this).is(':checked')) {
      // Ensure FBM is unchecked
      $('#merchant').prop('checked', false);
      $('#location_fieldset').hide();
      // Animate FBV table
      $('#fbvTable').slideDown(animationSpeed);

      // Hide FBM table and section
      $('#fullByMerchant').slideUp(animationSpeed);
      $('#fbmTable').slideUp(animationSpeed);
    } else {
      // Ensure at least one checkbox remains checked
      $(this).prop('checked', true);
      $('#location_fieldset').show();
    }
  });



