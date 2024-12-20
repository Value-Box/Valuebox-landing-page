  // Form submission or button click validation
  $("#addProNextBtn").on("click", function () {
    // If valid, proceed further
    $("#basicInformationForm").hide();
    $("#addProductSection").show();
  
    // Scroll to the top of the #addProductSection
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      5 // Duration in milliseconds (500ms = 0.5 seconds)
    );
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



    //     //video preview in modal
    // const $modalVideo = $('#modalVideo');
    // const $modalVideoSource = $modalVideo.find('source');
  
    // // Handle thumbnail clicks
    // $('.video-thumbnail').on('click', function () {
    //   const videoSrc = $(this).data('video');
    //   $modalVideoSource.attr('src', videoSrc);
    //   $modalVideo[0].load(); // Load video in modal but do not play automatically
    // });
  
    // // Stop video playback and reset source when modal is closed
    // $('#videoModal').on('hidden.bs.modal', function () {
    //   $modalVideo[0].pause();
    //   $modalVideo[0].currentTime = 0; // Reset video to the beginning
    //   $modalVideoSource.attr('src', ''); // Clear the video source
    // });
  
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
  if ($('#productDesc').length > 0) {
    ClassicEditor.create($('#productDesc')[0])
        .catch(error => {
            console.error(error);
        });
}

// Check if the element exists before initializing CKEditor for #highlight
if ($('#highlight').length > 0) {
    ClassicEditor.create($('#highlight')[0])
        .catch(error => {
            console.error(error);
        });
}
  
//Modal open for videos and images selection
function openMediaCenter(param) {
  console.log("Parameter received:", param);

  // Select containers using jQuery
  const imgContainer = $('#mod_Med_Img');
  const vidContainer = $('#mod_Med_Video');
  const imgTab = $('#pictureTab');
  const vidTab = $('#videoTab');

  // Show/Hide containers based on the parameter
  if (param === 'picture') {
      imgContainer.show();  
      imgTab.show();  
      vidContainer.hide();  
      vidTab.hide(); 
      $("#doneButton").addClass('pictureDoneBTn')
      $("#doneButton").removeClass('videoDoneBTn') 
  } 
  if (param === 'video') {
      vidContainer.show();  
      vidTab.show();  
      imgContainer.hide();  
      imgTab.hide(); 
      $("#doneButton").addClass('videoDoneBTn')
      $("#doneButton").removeClass('pictureDoneBTn') 
  }
}


//only one input checked on videos
$(document).on('click', '#medCenVideoPreviewContainer input[type="checkbox"]', function() {      
  $('input[type="checkbox"]').not(this).prop('checked', false);      
});

// Function to handle image preview selection
function handleImagePreviewSelection() {
  const $previewContainer = $('#previewContainer');

  // Handle selected images (allow multiple selection)
  $('#medCenImgPreviewContainer .form-check-input:checked').each(function() {
      const $parentDiv = $(this).closest('div').clone(); // Clone parent div (image container)
      const imageSrc = $parentDiv.find('img').attr('src');  // Get image source

      // Check if the image is already added in the preview container
      if ($previewContainer.find(`img[src="${imageSrc}"]`).length === 0) {
          $parentDiv.find('.form-check-input').remove(); // Remove checkbox in preview

          // Create a cross icon and append to the image with the class '.remove-btn'
          const $closeButton = $('<span class="remove-btn" style="position: absolute; top: -5px; right: -5px; cursor: pointer;">&#10006;</span>');
          $parentDiv.append($closeButton);  // Add the close button to the image div

          // Event to remove the image on cross click
          $closeButton.on('click', function() {
              $(this).closest('div').remove();  // Remove the parent div (image container)
          });

          $previewContainer.append($parentDiv); // Add cloned div to image preview container
      }
  });

  console.log("Selected images moved to preview container.");
}

// Function to handle video preview selection (allow only one video)
function handleVideoPreviewSelection() {
  const $videoPreviewContainer = $('#videoPreviewContainer');
  let videoAlreadyAdded = false; // Flag to check if a video is already added

  console.log("Handle video preview selection triggered");

  // Handle selected videos
  $('#medCenVideoPreviewContainer .form-check-input:checked').each(function () {
      const $parentDiv = $(this).closest('div').clone(); // Clone parent div (video container)
      const videoSrc = $parentDiv.find('video').attr('src'); // Get video source
      console.log("Selected video source:", videoSrc);

      // Check if a video is already added in the preview container
      if ($videoPreviewContainer.find('video').length === 0) {
          console.log("No video exists, adding a new one");
          $parentDiv.find('.form-check-input').remove(); // Remove checkbox in preview

          // Set width of video container to 'fit-content'
          $parentDiv.css('width', 'fit-content');

          // Create a cross icon for the video with the class '.remove-btn' and append it
          const $closeButton = $('<span class="remove-btn" style="position: absolute; top: 0; right: 0; cursor: pointer;">&#10006;</span>');
          $parentDiv.append($closeButton); // Add the close button to the video div

          // Event to remove the video on cross click
          $closeButton.on('click', function () {
              console.log("Video removed from preview container");
              $(this).closest('div').remove(); // Remove the parent div (video container)
              videoAlreadyAdded = false; // Reset the flag
          });

          $videoPreviewContainer.append($parentDiv); // Add cloned div to video preview container
      } else {
          // If a video already exists, show the alert
          console.log("Video already exists, alerting user");
          videoAlreadyAdded = true;
      }
  });

  // If a video already exists, show alert message
  if (videoAlreadyAdded) {
      alert("A video is already added to the preview container!");
  }

  console.log("Selected videos moved to preview container.");
}

$('#doneButton').on('click', function() {
  if ($("#doneButton").hasClass('pictureDoneBTn')) {
      handleImagePreviewSelection();
  } else if ($("#doneButton").hasClass('videoDoneBTn')) {
      handleVideoPreviewSelection();
  }
});








//upload images with preview
function handleFileUpload(inputId, containerId, errorContainerId) {
  const processedFiles = new Set(); // To track processed file names

  $("#" + inputId).on("change", function (event) {
    const files = event.target.files;
    const previewContainer = $("#" + containerId);
    const errorContainer = $("#" + errorContainerId);

    // Clear previous errors
    errorContainer.empty().hide();

    // Allowed formats and size
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    const maxFileSize = 512000; // 500KB

    // Variables to track errors
    const errorMessages = {
      size: [],
      format: [],
      duplicate: [],
    };

    $.each(files, function (index, file) {
      if (processedFiles.has(file.name)) {
        // Duplicate file error
        errorMessages.duplicate.push(file.name);
      } else if (!allowedFormats.includes(file.type)) {
        // Invalid format error
        errorMessages.format.push(file.name);
      } else if (file.size > maxFileSize) {
        // Size error
        errorMessages.size.push(file.name);
      } else {
        // Add valid file to processedFiles set and display preview
        processedFiles.add(file.name);

        const reader = new FileReader();

        // Create a container for the file preview
        const fileContainer = $("<div>")
          .addClass("file-container")
          .css({
            display: "inline-block",
            position: "relative",
            
          });

        const filePreview = $("<div>").addClass("file-preview");

        const removeBtn = $(
          '<span class="remove-btn" style="position: absolute; top: -5px; right: -5px; cursor: pointer;">&#10006;</span>'
        );

        removeBtn.on("click", function () {
          fileContainer.remove();
          processedFiles.delete(file.name);
        });

        if (file.type.startsWith("image")) {
          const img = $("<img>")
            .addClass("w-100px rounded-2")
            .css({
              width: "100px",
              borderRadius: "4px",
            });

          reader.onload = function (e) {
            img.attr("src", e.target.result);
          };
          reader.readAsDataURL(file);

          filePreview.append(img);
        }

        fileContainer.append(filePreview).append(removeBtn);
        previewContainer.append(fileContainer);
      }
    });

    // Generate consolidated error message
    let consolidatedMessage = "";
    if (errorMessages.size.length > 0) {
      consolidatedMessage += `The following files exceed the maximum size of 500KB.`;
    }
    if (errorMessages.format.length > 0) {
      consolidatedMessage += `The following files are not in allowed formats (JPG, PNG, WEBP).`;
    }
    if (errorMessages.duplicate.length > 0) {
      consolidatedMessage += `The following files have already been added.`;
    }

    // Display consolidated error message
    if (consolidatedMessage) {
      const errorElement = $("<div>")
        .addClass("error-message")
        .css("color", "red")
        .text(consolidatedMessage.trim());
      errorContainer.append(errorElement).show();
      setTimeout(() => {
        errorElement.fadeOut("slow", () => {
          errorElement.remove(); // Remove the error element from the DOM
        });
      }, 10000);
    }
  });
}

// Attach event listeners to file inputs
handleFileUpload("uploadImgSecinput", "previewContainer", "errorContainerUpload");
handleFileUpload("medCenImg", "medCenPreviewContainer", "errorContainerMedCen");


  function handleVideoUpload(inputId, containerId, errorContainerId) {
    const inputSelector = $("#" + inputId);

    // Remove any existing event listener to prevent duplication
    inputSelector.off("change");

    // Attach the change event listener
    inputSelector.on("change", function (event) {
        const files = event.target.files;
        const previewContainer = $("#" + containerId);
        const errorContainer = $("#" + errorContainerId);

        // Clear existing error messages
        errorContainer.empty().hide();

        // Allowed formats and file size
        const allowedFormats = ["video/mp4"];
        const maxFileSize = 5242880; // 5MB
        let isValid = true;

        // Check if a video already exists in the preview container
        if (previewContainer.find("video").length > 0) {
            isValid = false;
            const errorMessage = `Only one video is allowed. Please remove the existing video before adding a new one.`;
            errorContainer.append($("<div>").addClass("error-message").css("color", "red").text(errorMessage));
            errorContainer.show();

            // Reset the input value to allow re-selection
            inputSelector.val('');
            return; // Stop further processing
        }

        // Check all files and display previews or errors
        $.each(files, function (index, file) {
            if (!allowedFormats.includes(file.type)) {
                isValid = false;
                const errorMessage = `Only MP4 videos are allowed. Please upload a valid MP4 video file.`;
                errorContainer.append($("<div>").addClass("error-message").css("color", "red").text(errorMessage));

                // Reset the input value to allow re-selection
                inputSelector.val('');
                return false; // Stop further processing
            }

            if (file.size > maxFileSize) {
                isValid = false;
                const errorMessage = `File size exceeds the maximum allowed size of 5MB. Please upload a smaller file.`;
                errorContainer.append($("<div>").addClass("error-message").css("color", "red").text(errorMessage));

                // Reset the input value to allow re-selection
                inputSelector.val('');
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

            const removeBtn = $('<span class="remove-btn" style="position: absolute; top: -5; right: -5; cursor: pointer;">&#10006;</span>');

            removeBtn.on("click", function () {
                videoWrapper.remove(); // Remove video preview
                errorContainer.empty().hide(); // Clear error messages
                inputSelector.val(''); // Reset the input to allow re-adding files
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

// Reattach the event listeners every time the input field is clicked
$(document).ready(function () {
    $("#newVidFileBTn, #medCenNewVidFileBTn").on("click", function () {
        handleVideoUpload("newVidFileBTn", "videoPreviewContainer", "errorMessage");
        handleVideoUpload("medCenNewVidFileBTn", "medCenVideoPreviewContainer", "medCenVidErrMes");
    });
});

    // Calculate Pricing
    function calculatPricing() {
      let costPrice = parseInt($("#costPrice").val()) || 0;
      let sellingPrice = parseInt($("#sellingPrice").val()) || 0;
      let specialPrice = parseInt($("#specialPrice").val()) || 0;
      let profitElement = $("#Profit");
  
      let profit = sellingPrice - costPrice;
      let finalProfit = specialPrice - costPrice;
      if (costPrice === 0) {
        profitElement.text("0.00");
        return; // Exit the function early
      }
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



  $(document).ready(function() {
    $(".select-dropdown").select2({
        dropdownAutoWidth: true,  // Auto width based on the input field
        dropdownParent: $("body")  // Append dropdown to body
    });

    // Listen for when the dropdown opens
    $(".select-dropdown").on("select2:open", function() {
        var dropdown = $(this).data('select2').dropdown.$dropdown;
        var dropdownHeight = dropdown.outerHeight();
        var windowHeight = $(window).height();
        var inputTop = $(this).offset().top;
        var inputHeight = $(this).outerHeight();

        // Check if the dropdown is near the bottom of the screen
        if (inputTop + inputHeight + dropdownHeight > windowHeight) {
            // Open upwards
            dropdown.css({
                top: 'auto',    // Reset top
                bottom: '100%'   // Position from the bottom
            });
        } else {
            // Open downwards
            dropdown.css({
                top: '100%',     // Position from the top
                bottom: 'auto'   // Reset bottom
            });
        }
    });
});

// $("#digital_product")

$("#digital_product").click(function () {
  if (this.checked) {
      $(".product_type").fadeOut(400); // Adjust the duration (400ms) as needed for smoothness
  } else {
      $(".product_type").fadeIn(400); // Adjust the duration (400ms) as needed for smoothness
  }
});
