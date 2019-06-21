export abstract class ValueObject<T extends ValueObject<T>> {
    props: string[]
    
    protected setPropsInEqualityCheck(...props: string[]) {
      this.props = props;
    }
    
    public equals(other?: T): boolean {
      if (other === null || other === undefined) {
        return false;
      }
      if (this.props.length !== other.props.length) {
        return false;
      }
      for (const prop of this.props) {
        if (this[prop] !== other[prop])
          return false;
      } 
  
      return true;
    }

    protected clone(): ValueObject<T> {
      const clone: ValueObject<T> = Object.assign({}, this);
      Object.freeze(clone);
      return clone;
    }
}