exports.paginate = (param) => {
    const pageAsNumber = Number.parseInt(param.page);
    const sizeAsNumber = Number.parseInt(param.size);
  
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }
  
    let size = 10;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 10) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }
  
    return {
      page: page,
      size: size,
      totalPage: (tableRows) => Math.ceil(tableRows / size),
    };
  };
  