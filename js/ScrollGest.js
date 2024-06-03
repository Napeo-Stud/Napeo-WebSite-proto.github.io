let locoScroll;
locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 1,
    direction: 'horizontal',
});
new ResizeObserver(() => locoScroll.update()).observe(
    document.querySelector("[data-scroll-container]")
);