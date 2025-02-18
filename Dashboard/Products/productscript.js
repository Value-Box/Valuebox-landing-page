// // Form submission or button click validation
// $("#addProNextBtn").on("click", function () {
//   // Check if the Product Name and Category are valid
//   const productName = $("#productName1").val().trim();
//   const category = $(".select-dropdown").val();

//   let isValid = true;

//   if (category==="") {
//     $("#basicInformationForm .select2-selection").addClass("error-border");
//     isValid = false;
//   }
//   // Validate Product Name
//   if (productName === "") {
//     const basicInformationForm=$("#basicInformationForm")
//     $("#productName1").addClass("error-border"); // Apply error border
//     $("#productName1").focus(); // Focus on the Product Name field
//     $('html, body').animate({ scrollTop: basicInformationForm.offset().top-100 }, 300);
//     isValid = false;
//   } else {
//     $("#productName1").removeClass("error-border"); // Remove error border
//   }

//   // Validate Category
//   if(productName!==''){
//     if (!category) {
//       $("#basicInformationForm .select2-selection").addClass("error-border"); // Apply error border to select dropdown
//       $("#basicInfoCategory").focus(); // Focus on the Category dropdown
//       $("#basicInfoCategory").select2("open");
//       isValid = false;
//     } else {
//       $("#basicInformationForm .select2-selection").removeClass("error-border"); // Remove error border
//     }
//   }

//   // If both fields are valid, proceed
//   if (isValid) {
//     $("#basicInformationForm").hide();
//     $("#addProductSection").show();

//     // Scroll to the top of the #addProductSection
//     $("html, body").animate(
//       {
//         scrollTop: 0,
//       },
//       500 // Duration in milliseconds (500ms = 0.5 seconds)
//     );
//   } else {
//     // Optionally, show an alert or display a message if fields are invalid
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Please fill out the all fields."
//     });
//   }
// });

// // Remove error border when user starts typing
// $("#productName1").on("input", function () {
//   if ($(this).val().trim() !== "") {
//     $(this).removeClass("error-border"); // Remove error border when the user starts typing
//   }
// });

// // Remove error border when user selecting a category
// $(".select-dropdown").on("change", function () {
//   if ($(this).val()) {
//     $("#basicInformationForm .select2-selection").removeClass("error-border"); // Remove error border when a category is selected
//   }
// });

// // Add error border when product nme is empty
// $("#productName1").on("blur", function () {
//   if ($(this).val().trim() === "") {
//     $(this).addClass("error-border"); // Add error border if the field is empty
//   }
// });

// // Add error border when category not select
// $(".select-dropdown").on("blur", function () {
//   if (!$(this).val()) {
//     $("#basicInformationForm .select2-selection").addClass("error-border"); // Add error border if no option is selected
//   }
// });


// // Sync product name with product name2
// $('#productName1').on('keyup', function () {
//   // Get the value from the first input
//   const value = $(this).val();
//   // Set the same value in the second input
//   $('#productName2').val(value);
// });

// // Sync dropdown2 with dropdown1
// $('#basicInfoCategory').on('change', function () {
//     const selectedValue = $(this).val(); // Get selected value from dropdown1
//     $('#basicInfoCategory2').val(selectedValue).trigger('change'); // Update dropdown2
// });

//Apply select2
$('.select2').select2();
$(document).ready(function () {
// Prevent form submission on Enter key press in the tags input field
$(".bootstrap-tagsinput input").on("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission
    // Trigger the event that creates a tag if your tags input library supports it
    $(this).trigger("blur"); // Simulate losing focus to create the tag
    $(this).focus();
  }
});
});
  // YouTube URL validation on input
  $("#utubeUrl").on("input", function () {
    const youtubeUrl = $(this).val();
    const youtubePattern =
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/|embed\/)?([a-zA-Z0-9_-]{11})$/;
    const videoPreviewContainer = $("#videoPreviewContainer");

    console.log("Current Input:", youtubeUrl);

    // Clear error and preview container initially
    $("#errorMessage").hide();
    videoPreviewContainer.empty();

    // If input is empty
    if (youtubeUrl === '') {
        $(".mediaVidCenterBtn").attr("disabled", false);
        $("#newVidFileBTn").attr("disabled", false);
        return;
    }

    // Disable other buttons while a YouTube URL is present
    $(".mediaVidCenterBtn").attr("disabled", true);
    $("#newVidFileBTn").attr("disabled", true);

    // Validate the YouTube URL
    const match = youtubeUrl.match(youtubePattern);
    if (!match) {
        $("#errorMessage").text("Invalid YouTube URL. Please enter a valid link.").show();
        return;
    }

    // Extract YouTube video ID and display preview
    const videoId = match[5];
    const iframe = `
        <div style="position: relative; display: inline-block; width: 258px;">
          <span 
            class="remove-btn" 
            style="position: absolute; top: -5px; right: -5px; padding: 5px; cursor: pointer; border-radius: 50%;"
          >
            &#10006;
          </span>
          <iframe 
            width="258px" 
            height="150px" 
            class="rounded"
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>`;

    videoPreviewContainer.html(iframe);

    // Add click event to remove the video and clear the input
    $(".remove-btn").on("click", function () {
        videoPreviewContainer.empty(); // Clear the video preview
        $("#utubeUrl").val(''); // Clear the input field
        $(".mediaVidCenterBtn").attr("disabled", false); // Re-enable buttons
        $("#newVidFileBTn").attr("disabled", false);
    });
});

  
  
  //select lcations from location dropdown and change the table tbody
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
      
        //redirect the register brand page
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

  // Add Classic editor
  if ($('#productDesc').length > 0) {
    ClassicEditor.create($('#productDesc')[0])
        .catch(error => {
            console.error(error);
        });
}

//Add Classic editor
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

          $parentDiv.find('.form-check-input').remove(); // Remove checkbox in preview

          // Set width of video container to 'fit-content'
          $parentDiv.css('width', 'fit-content');
          const inputSelector = $("#utubeUrl");
          // Check if there is a video in the preview container
          
              // Disable the input if a video is present
              inputSelector.prop('disabled', true);
         
          // Create a cross icon for the video with the class '.remove-btn' and append it
          const $closeButton = $('<span class="remove-btn" style="position: absolute; top: -5; right: -5; cursor: pointer;">&#10006;</span>');
          $parentDiv.append($closeButton); // Add the close button to the video div

          // Event to remove the video on cross click
          $closeButton.on('click', function () {
              console.log("Video removed from preview container");
              $(this).closest('div').remove(); // Remove the parent div (video container)
              inputSelector.prop('disabled', false);

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
      // alert("A video is already added to the preview container!");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "A video is already added to the preview container!"
      });
  }
}

//Add the Images and Video From Media Center Modal
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
// handleFileUpload("medCenImg", "medCenPreviewContainer", "errorContainerMedCen");


  function handleVideoUpload(inputId, containerId, errorContainerId) {
    const processedFiles = new Set();
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
            processedFiles.add(file.name);
            console.log(processedFiles)
            const removeBtn = $('<span class="remove-btn" style="position: absolute; top: -5; right: -5; cursor: pointer;">&#10006;</span>');
            const utubeUrl = $("#utubeUrl");

            removeBtn.on("click", function () {
                videoWrapper.remove(); // Remove video preview
                errorContainer.empty().hide(); // Clear error messages
                //inputSelector.val(''); // Reset the input to allow re-adding files
                processedFiles.delete(file.name);
                console.log("Removed file:", file.name);
                // Check if there is a video in the preview container
                    // Disable the input if a video is present
                    utubeUrl.prop('disabled', false);
            });

            const fileName = $("<div>").addClass("file-name").text(file.name);

            // Append video, file name, and remove button
            videoWrapper.append(videoElement, fileName, removeBtn);
            previewContainer.append(videoWrapper);

            utubeUrl.prop('disabled', true);
            inputSelector.val('');
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
        // handleVideoUpload("medCenNewVidFileBTn", "medCenVideoPreviewContainer", "medCenVidErrMes");
    });
});


// Format all price table inputs to two decimal places on blur
$("input[type='number']").on("blur", function () {
  let value = parseFloat($(this).val()) || 0;
  $(this).val(value.toFixed(2));
});

// Special Price Validation
$("#specialPrice").on("input", function () {
  let sellingPrice = parseFloat($("#sellingPrice").val()) || 0;
  let specialPrice = parseFloat($(this).val()) || 0;

  // Check if Selling Price is entered
  if (sellingPrice === 0) {
    Swal.fire({
      title: 'Error!',
      text: 'Please enter a Selling Price first.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      $("#specialPrice").val("0"); // Reset Special Price to 0
      $("#sellingPrice").focus(); // Focus Selling Price input
    });
    return; // Stop further processing
  }
  // Special Price must be less than Selling Price
  if (specialPrice >= sellingPrice) {
      Swal.fire({
          title: 'Error!',
          text: 'Special Price must be less than Selling Price',
          icon: 'error',
          confirmButtonText: 'OK'
      }).then(() => {
          // Reset Special Price to 0 after clicking OK
          $("#specialPrice").val("0");
      });
  }
});
$("#costPrice").on("input", function () {
  $("#profitPercentage").val("0");
});

$("#profitPercentage").on("input", function () {
  let sellingPrice = parseFloat($("#sellingPrice").val()) || 0;
  let specialPrice = parseFloat($("#specialPrice").val()) || 0;
  let costPrice = parseFloat($("#costPrice").val()) || 0;
  let profitPercentageElement = $("#profitPercentage");
  
  if (specialPrice >= sellingPrice) {
    Swal.fire({
        icon: "error",
        title: "Invalid Special Price",
        text: "Special Price must be less than Selling Price.",
        confirmButtonText: "OK",
    }).then(() => {
        // Reset Special Price to sellingPrice - 1
        let newSpecialPrice = sellingPrice - 1;
        $("#specialPrice").val(newSpecialPrice);

        // Calculate the new profit percentage
        if (costPrice > 0 && newSpecialPrice > 0) {
            let profit = newSpecialPrice - costPrice;
            let profitPercentage = (profit / newSpecialPrice) * 100;

            // Update the profit percentage field with the recalculated value
            profitPercentageElement.val(profitPercentage.toFixed(2));
        }
    });
    return; // Stop further execution
}
});

$("#costPrice").on("input", function () {
  let sellingPrice = parseFloat($("#sellingPrice").val()) || 0;
  let specialPrice = parseFloat($("#specialPrice").val()) || 0;
  let costPrice = parseFloat($("#costPrice").val()) || 0;
  let profitPercentageElement = $("#profitPercentage");
  let profitElement = $("#Profit");

  // Validate Special Price
  if (specialPrice >= sellingPrice && sellingPrice > 0) {
      Swal.fire({
          icon: "error",
          title: "Invalid Special Price",
          text: "Special Price must be less than Selling Price.",
          confirmButtonText: "OK",
      }).then(() => {
          let newSpecialPrice = sellingPrice - 1;
          $("#specialPrice").val(newSpecialPrice);

          // Recalculate profit percentage for Special Price
          if (costPrice > 0 && newSpecialPrice > 0) {
              let profit = newSpecialPrice - costPrice;
              let profitPercentage = (profit / newSpecialPrice) * 100;
              profitPercentageElement.val(profitPercentage.toFixed(2));
          }
      });
      return;
  }

  // Recalculate profit percentage without changing Selling Price
  if (costPrice > 0) {
      if (specialPrice > 0) {
          let profit = specialPrice - costPrice;
          let profitPercentage = (profit / specialPrice) * 100;
          profitPercentageElement.val(profitPercentage.toFixed(2));
          profitElement.text((specialPrice - costPrice).toFixed(2));
      } else if (sellingPrice > 0) {
          let profit = sellingPrice - costPrice;
          let profitPercentage = (profit / sellingPrice) * 100;
          profitPercentageElement.val(profitPercentage.toFixed(2));
          profitElement.text((sellingPrice - costPrice).toFixed(2));
      }
  }

});


$("#costPriceErr").css('display','none')
// Calculate Pricing
function calculatPricing() {
  let costPrice = parseFloat($("#costPrice").val()) || 0;
  let sellingPrice = parseFloat($("#sellingPrice").val()) || 0;
  let specialPrice = parseFloat($("#specialPrice").val()) || 0;
  let profitElement = $("#Profit");
  let profitPercentageElement = $("#profitPercentage");

  // Get the manually entered profit percentage
  let manualProfitPercentage = parseFloat(profitPercentageElement.val()) || 0;

  // Reset fields if cost price is 0
  if (costPrice === 0) {
      profitElement.text("0");
      // $("#sellingPrice").val("");
      // $("#specialPrice").val("");
      // profitPercentageElement.val("0");
      $("#costPriceErr").css('display','block')
      return;
  }else{
    $("#costPriceErr").css('display','none')
  }

  
  // If manually entering the profit percentage
  if (document.activeElement.id === "profitPercentage" && manualProfitPercentage !== 0) {
    if (manualProfitPercentage > 99) {
        Swal.fire({
            icon: "error",
            title: "Invalid Profit Percentage",
            text: "Profit Percentage cannot exceed 99%.",
            confirmButtonText: "OK",
        }).then(() => {
            // Reset profit percentage to 99 and trigger recalculation
            profitPercentageElement.val("99"); // Update the input field
            manualProfitPercentage = 99; // Sync the variable with the new value

            // Perform recalculations immediately
            let profitMargin = manualProfitPercentage / 100;
            sellingPrice = costPrice / (1 - profitMargin);

            if (specialPrice > 0) {
                specialPrice = costPrice / (1 - profitMargin);
                $("#specialPrice").val(specialPrice.toFixed(2));
                profitElement.text((specialPrice - costPrice).toFixed(2));
                
            } else {
                $("#sellingPrice").val(sellingPrice.toFixed(2));
                profitElement.text((sellingPrice - costPrice).toFixed(2));
            }

            profitPercentageElement.focus(); // Refocus to the input field
        });
        return; // Stop further execution
    }

    // Perform regular calculation if within valid range
    let profitMargin = manualProfitPercentage / 100;
    sellingPrice = costPrice / (1 - profitMargin);

    if (specialPrice > 0) {
        specialPrice = costPrice / (1 - profitMargin);

        // Validate that Special Price is less than Selling Price
      
        $("#specialPrice").val(specialPrice.toFixed(2));
        profitElement.text((specialPrice - costPrice).toFixed(2));
        console.log(profitElement)
        
    } else {
        $("#sellingPrice").val(sellingPrice.toFixed(2));
        profitElement.text((sellingPrice - costPrice).toFixed(2));
    }
    return; // Stop further recalculations
}
  // If manually entering the selling price
  if (document.activeElement.id === "sellingPrice") {
    if (sellingPrice <= costPrice) {
      profitPercentageElement.val("0");
      return; // Stop further execution
  }

    let profit = sellingPrice - costPrice;
    let profitPercentageAuto = ((sellingPrice - costPrice) / sellingPrice) * 100;

    if (profitPercentageAuto > 99) {
        Swal.fire({
            icon: "error",
            title: "Invalid Selling Price",
            text: "Profit Percentage cannot exceed 99%.",
            confirmButtonText: "OK",
        }).then(() => {
            profitPercentageElement.val("99");

            let profitMargin = 99 / 100;
            sellingPrice = costPrice / (1 - profitMargin);

            $("#sellingPrice").val(sellingPrice.toFixed(2));
            profitElement.text((sellingPrice - costPrice).toFixed(2));
        });
        return; // Stop further execution
    } else {
        profitElement.text(profit.toFixed(2));
        profitPercentageElement.val(profitPercentageAuto.toFixed(2));
    }
    return; // Stop further recalculations
}


  // Automatic calculation based on other fields
  let profit = sellingPrice - costPrice;
  let finalProfit = specialPrice - costPrice;

  if (specialPrice > 0) {
    if (specialPrice <= costPrice) {
      profitPercentageElement.val("0");
      return; // Stop further execution
  }
      profitElement.text(finalProfit.toFixed(2));
      let finalProfitPercentage = ((specialPrice - costPrice) / specialPrice) * 100;
      if (document.activeElement.id !== "profitPercentage") {
          profitPercentageElement.val(finalProfitPercentage.toFixed(2));
      }
  } else {
      profitElement.text(profit.toFixed(2));
      let profitPercentageAuto = ((sellingPrice - costPrice) / sellingPrice) * 100;
      if (document.activeElement.id !== "profitPercentage") {
          profitPercentageElement.val(profitPercentageAuto.toFixed(2));
      }
  }

  // Handle case when Special Price is removed
  if (!specialPrice && manualProfitPercentage > 0) {
      let profitMargin = manualProfitPercentage / 100;
      sellingPrice = costPrice / (1 - profitMargin);
      // $("#sellingPrice").val(sellingPrice.toFixed(2));
      profitElement.text((sellingPrice - costPrice).toFixed(2));
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
          minDate: moment(), // Prevent selection of previous dates
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
      $("#packageWeight").removeClass("required")
  } else {
      $(".product_type").fadeIn(400); // Adjust the duration (400ms) as needed for smoothness
      $("#packageWeight").addClass("required")
  }
});



// $(document).ready(function () {
//   // Get the CKEditor instance for Product Description
//   const productDescEditor = $('.ck-content').first(); // Target the first CKEditor content container
//   const charCountDisplay = $('#charCountDisplay'); // Assuming you have a span/div for showing character count

//   // Function to get raw text content from CKEditor
//   function getRawText(editor) {
//     return editor.text().trim();
//   }

//   // Monitor changes in CKEditor content
//   productDescEditor.on('input', function () {
//     const content = getRawText(productDescEditor); // Get raw text content
//     const charCount = content.length; // Calculate character count

//     // Update the character count display
//     charCountDisplay.text(`Character Count: ${charCount}`);

//     // Add validation
//     if (charCount < 125 || charCount > 1500) {
//       charCountDisplay.css('color', 'red'); // Show error if out of range
//     } else {
//       charCountDisplay.css('color', '#666'); // Normal color
//     }
//   });
// });

$('#addProductForm').on('submit', function (e) {
  e.preventDefault(); // Prevent form submission for validation

  let isValid = true;
  let firstInvalidElement = null;
  let ckEditorTriggered = false; // Flag to track SweetAlert for CKEditor validation

  // 1. Get the content from the first CKEditor (Product Description)
  const productDescEditor = $('.ck-content').first(); // Target the first CKEditor (Product Description)
  const productDescContent = productDescEditor.text().trim(); // Get text content of the <p> tag

  // Remove any extra spaces or unwanted line breaks (to ensure accurate character count)
  const cleanProductDescContent = productDescContent.replace(/\s+/g, ' ').trim();

  // Log the character count in the console
  console.log("Product Description character count:", cleanProductDescContent.length);

  // 2. Validate required fields
  $('.required').each(function () {
    const isSelect = $(this).is('select') && $(this).hasClass('select-dropdown');
    const value = $(this).val()?.trim();
    const isEmpty = isSelect ? !value : value === ''; // Check if the field is empty

    if (isEmpty) {
      isValid = false;
      $(this).addClass('error-border'); // Add error border

      // Handle select2-specific styling for select dropdowns
      if (isSelect) {
        $(this).next('.select2-container').addClass('error-border');
      }

      // Mark the first invalid element
      if (!firstInvalidElement) {
        firstInvalidElement = $(this);
      }
    } else {
      $(this).removeClass('error-border'); // Remove error border if valid
      if (isSelect) {
        $(this).next('.select2-container').removeClass('error-border');
      }
    }
  });

  // 3. Validate image upload (Ensure at least one image is uploaded)
  const previewContainer = $('#previewContainer');
  if (previewContainer.children().length === 0) {
    isValid = false;
    $('#errorContainerUpload').text('Please upload at least one image!').show(); // Show upload error

    if (!firstInvalidElement) {
      firstInvalidElement = $('#uploadImgSec'); // Mark image upload section as invalid
    }
  } else {
    $('#errorContainerUpload').hide(); // Hide upload error if valid
  }

  // 4. Validate Product Description (150 characters minimum and maximum 1500)
  if (cleanProductDescContent.length < 160 || cleanProductDescContent.length > 1500) {
    isValid = false;
    productDescEditor.addClass('error-border'); // Add error border for Product Description CKEditor
    
    if (!firstInvalidElement) {
      firstInvalidElement = productDescEditor;
    }
  
    if (!ckEditorTriggered) {
      ckEditorTriggered = true; // Set CKEditor triggered flag to true
  
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Product Description must contain between 160 and 1500 characters!",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "OK"
      }).then(() => {
        // After SweetAlert closes, scroll to the invalid CKEditor and focus it
        $('html, body').animate({ scrollTop: productDescEditor.offset().top - 200 }, 300);
        
        const editor = productDescEditor.find('.ck-editor__editable').data('editor');
        if (editor) {
          editor.focus(); // Focus CKEditor instance
        } else {
          productDescEditor.find('.ck-editor__editable').focus(); // Fallback: Focus the editable area directly
        }
      });
    }
    return; // Stop further validation
  }
  

  // 5. Validate Highlights (Ensure at least 3 <li> items in <ul> or <ol>)
const highlightEditor = $('.ck-content').eq(1); // Target the second CKEditor
const highlightListItems = highlightEditor.find("ul li, ol li").filter(function () {
  return $(this).text().trim() !== ''; // Check for non-empty list items
});

if (highlightListItems.length < 3) {
  isValid = false;
  highlightEditor.addClass('error-border'); // Add error border for Highlights CKEditor

  if (!firstInvalidElement) {
    firstInvalidElement = highlightEditor;
  }

  if (!ckEditorTriggered) {
    ckEditorTriggered = true; // Set CKEditor triggered flag to true

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Highlights must contain at least 3 bullet points!",
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: "OK"
    }).then(() => {
      // After SweetAlert closes, scroll to the invalid CKEditor and focus it
      $('html, body').animate({ scrollTop: highlightEditor.offset().top - 200 }, 300);

      const editor = highlightEditor.find('.ck-editor__editable').data('editor');
      if (editor) {
        editor.focus(); // Focus CKEditor instance
      } else {
        highlightEditor.find('.ck-editor__editable').focus(); // Fallback: Focus the editable area directly
      }
    });
  }
  return; // Stop further validation
} else {
  highlightEditor.removeClass('error-border'); // Remove error border if valid
}


  // 6. Handle form submission if it's invalid
  if (!isValid) {
    if (firstInvalidElement && !ckEditorTriggered) {
      if (firstInvalidElement.is('select')) {
        firstInvalidElement.select2('open'); // Open the select dropdown if it's a select element
      } else if (!firstInvalidElement.hasClass('ck-content')) {
        // Scroll to the first invalid element and focus it
        $('html, body').animate({ scrollTop: firstInvalidElement.offset().top - 100 }, 300);
        firstInvalidElement.focus();
      }
    }

    // Show SweetAlert for missing required fields
    if (!ckEditorTriggered) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields!",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "OK"
      }).then(() => {
        // After SweetAlert closes, scroll to the first invalid element and focus it
        $('html, body').animate({ scrollTop: firstInvalidElement.offset().top - 100 }, 300);
        firstInvalidElement.focus();
      });
    }
  } else {
    // If the form is valid, submit the form
    this.submit();
  }
});









// Handle input typing to dynamically remove/add red border
$(document).on('input', '.required', function () {
  if ($(this).val().trim() === '') {
    $(this).addClass('error-border');
  } else {
    $(this).removeClass('error-border');
  }
});

// Handle the change event for select2 dropdown to dynamically remove red border
$(document).on('change', '.select-dropdown', function () {
  if ($(this).val()) {
    $(this).next('.select2-container').removeClass('error-border');
  } else {
    $(this).next('.select2-container').addClass('error-border');
  }
});

// Handle the change event for the digital product checkbox
$('#digital_product').on('change', function () {
  const packageWeightInput = $('#package_weight');
  if ($(this).is(':checked')) {
    // When the checkbox is checked, remove 'required' and add 'not-required'
    packageWeightInput.removeClass('required').addClass('not-required').val('');
    packageWeightInput.removeClass('error-border');
  } else {
    // When the checkbox is unchecked, restore 'required'
    packageWeightInput.removeClass('not-required').addClass('required');
  }

});
