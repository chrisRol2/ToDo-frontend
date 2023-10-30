const defaultImg = `data:image/png;base64,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`;

export default defaultImg;