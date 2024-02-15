$('#confirmDelete').click(async function() {

    const destroyAcc = async () => {
        const response = await fetch(`/api/users/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log("Account deleted successfully.");

            document.location.replace('/goodbye');
        }
    };

    await destroyAcc();
});
