
$('nav').addClass('affix');

$(function() {
  // Toggle search menu
  var $SearchToggle = $('.search-toggle');
  $SearchToggle.hide();

  $('.toggle-btn').on('click', function(e){
    e.preventDefault();
    $SearchToggle.slideToggle(300);
  });
})

// UOU Selects
// ---------------------------------------------------------
$.fn.uouCustomSelect = function () {
  var $select = $(this);

  $select.wrap('<div class="uou-custom-select"></div>');

  var $container = $select.parent('.uou-custom-select');

  $container.append('<ul class="select-clone"></ul>');

  var $list = $container.children('.select-clone'),
    placeholder = $select.data('placeholder') ? $select.data('placeholder') : $select.find('option:eq(0)').text();

  $('<input class="value-holder" type="text" disabled="disabled" placeholder="' + placeholder + '"><span class="fa glyphicon glyphicon-chevron-down"></span>').insertBefore($list);

  var $valueHolder = $container.children('.value-holder');

  // Create clone list
  $select.find('option').each(function () {
    var $this = $(this);

    $list.append('<li data-value="' + $this.val() + '">' + $this.text() + '</li>');
  });

  // Toggle list
  $container.on('click', function () {
    $container.toggleClass('active');
    $list.slideToggle(250);
  });

  // Option Select
  $list.children('li').on('click', function () {
    var $this = $(this);

    $valueHolder.val($this.text());
    $select.find('option[value="' + $this.data('value') + '"]').prop('selected', true);
  });

  // Hide
  $container.on('clickoutside touchendoutside', function () {
    if (!dragging) {
      $container.removeClass('active');
      $list.slideUp(250);
    }
  });

  // Links
  if ($select.hasClass('links')) {
    $select.on('change', function () {
      window.location.href = select.val();
    });
  }

  $select.on('change', function () {
    cosole.log(chnaged);
    cosole.log($(this).val());
  });
};

$('select').each(function () {
  $(this).uouCustomSelect();
});
