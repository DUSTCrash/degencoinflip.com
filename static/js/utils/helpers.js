export const rando = (len = 7) => (Math.random() + 1).toString(36).substring(len);

export const randoSig = () => [...Array(8)].reduce(function (pV) {
    if (!pV?.length) return rando(2);
    return pV?.concat(rando(2));
}, []);

export const memoize = (id, amount, side) => {
    let memo = `id=${id} amount=${amount} side=${side}`;
    return Buffer.from(memo, "utf-8");
};
export const getSideName = (side) => {
    if (side === "H") return "Heads";
    return "Tails";
}