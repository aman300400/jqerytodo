$(document).ready(function () {

    let $inputBox = $("#input-box");
    let $listContainer = $("#list-container");

    let $taskBeingEdited = null;

    function addTask() {
        let taskText = $inputBox.val().trim();

        if (taskText === "") {
            alert("Please write down a task");
            return;
        }

        if ($taskBeingEdited !== null) {
            $taskBeingEdited.find(".task-text").text(taskText);
            $taskBeingEdited.removeClass("completed");
            $taskBeingEdited.find("input[type='checkbox']").prop("checked", false);

            $taskBeingEdited = null;
            $inputBox.val("");
            updateCounters();
            return;
        }

        let $li = $(`
            <li>
                <label>
                    <input type="checkbox">
                    <span class="task-text">${taskText}</span>
                </label>
                <span class="edit-btn">✏️</span>
                <span class="delete-btn">🗑️</span>
                <hr>
            </li>
        `);

        $listContainer.append($li);
        $inputBox.val("");
        updateCounters();
    }

    $("#input-button").on("click", addTask);

    $inputBox.on("keyup", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    $(document).on("change", "input[type='checkbox']", function () {
        $(this).closest("li").toggleClass("completed");
        updateCounters();
    });

    $(document).on("click", ".edit-btn", function () {
        let $li = $(this).closest("li");
        let text = $li.find(".task-text").text();
        $inputBox.val(text).focus();
        $taskBeingEdited = $li;
    });

    $(document).on("click", ".delete-btn", function () {
        let $li = $(this).closest("li");

        if ($taskBeingEdited === $li) {
            $taskBeingEdited = null;
            $inputBox.val("");
        }

        $li.remove();
        updateCounters();
    });

    /**
     * @description 
     */
    function updateCounters() {
        let completed = $("li.completed").length;
        let total = $("li").length;

        $("#completed-counter").text(completed);
        $("#uncompleted-counter").text(total - completed);
    }

});
