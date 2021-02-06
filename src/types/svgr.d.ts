interface SvgrComponent
	extends React.StatelessComponent<React.SVGProps<SVGSVGElement>> {}

declare module "*.svg" {
	const value: SvgrComponent;
	export default value;
}
