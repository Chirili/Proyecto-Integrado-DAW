<script>
    function changeChecked(node){
        node.checked = !node.checked
    }
</script>

<div>
  <input type="radio" name="opt" class="radio" value="" on:click={changeChecked}> 
  <span class="radio-mark"></span>
</div>