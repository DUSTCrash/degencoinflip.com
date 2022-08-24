export async function runWorkflow(
    workflowSteps: any,
    input: any,
    wallet: any
) {
    let state = { ...input };

    for (const handler of workflowSteps) {
        state = await handler(state, wallet);
    }

    return state;
}